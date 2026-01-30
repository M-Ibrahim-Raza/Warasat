"""
Chat System Module

Provides authentication, database management, and WebSocket support
for real-time chat between users and Ulema.
"""

import sqlite3
import uuid
import datetime
import bcrypt
import jwt
from typing import Optional, Dict, List, Any
from dataclasses import dataclass
from pathlib import Path

# JWT Configuration
SECRET_KEY = "warasat-secret-key-change-in-production"  # Change in production!
ALGORITHM = "HS256"
TOKEN_EXPIRY_DAYS = 7

# Database path
DB_PATH = Path(__file__).parent / "warasat.db"


# ============== Data Classes ==============

@dataclass
class User:
    id: str
    name: str
    email: str
    user_type: str  # "user" or "ulema"


@dataclass
class ChatMessage:
    id: str
    chat_id: str
    sender_id: str
    sender_type: str
    content: str
    timestamp: str
    is_read: bool = False


# ============== Database Setup ==============

def get_db_connection() -> sqlite3.Connection:
    """Get SQLite database connection with row factory"""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_database():
    """Initialize database tables and seed sample data"""
    conn = get_db_connection()
    
    # Create users table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        user_type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    # Create chats table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS chats (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        ulema_id TEXT NOT NULL,
        inheritance_data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (ulema_id) REFERENCES users (id)
    )
    ''')
    
    # Create messages table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        chat_id TEXT NOT NULL,
        sender_id TEXT NOT NULL,
        sender_type TEXT NOT NULL,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats (id),
        FOREIGN KEY (sender_id) REFERENCES users (id)
    )
    ''')
    
    # Seed sample Ulema accounts (admin-managed only)
    sample_ulemas = [
        ('ulema1', 'Mufti Abdullah', 'abdullah@example.com', 'password123', 'ulema'),
        ('ulema2', 'Mufti Ismail', 'ismail@example.com', 'password123', 'ulema'),
        ('ulema3', 'Mufti Yusuf', 'yusuf@example.com', 'password123', 'ulema')
    ]
    
    for ulema in sample_ulemas:
        cursor = conn.execute('SELECT id FROM users WHERE id = ?', (ulema[0],))
        if cursor.fetchone() is None:
            hashed_password = bcrypt.hashpw(ulema[3].encode('utf-8'), bcrypt.gensalt())
            conn.execute(
                'INSERT INTO users (id, name, email, password, user_type) VALUES (?, ?, ?, ?, ?)',
                (ulema[0], ulema[1], ulema[2], hashed_password, ulema[4])
            )
    
    conn.commit()
    conn.close()


# ============== JWT Token Management ==============

def generate_token(user_id: str, user_type: str) -> str:
    """Generate JWT token for authenticated user"""
    payload = {
        'user_id': user_id,
        'user_type': user_type,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=TOKEN_EXPIRY_DAYS)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    # Handle PyJWT version differences
    if isinstance(token, bytes):
        return token.decode('utf-8')
    return token


def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


def get_user_from_token(authorization: Optional[str]) -> Optional[Dict[str, Any]]:
    """Extract user info from Authorization header"""
    if not authorization or not authorization.startswith('Bearer '):
        return None
    
    token = authorization.split(' ')[1]
    return verify_token(token)


# ============== User Management ==============

def create_user(name: str, email: str, password: str, user_type: str = "user") -> Optional[User]:
    """Create a new user (only allows 'user' type, not 'ulema')"""
    # Only allow regular user signup
    if user_type != "user":
        return None
    
    conn = get_db_connection()
    
    # Check if email exists
    cursor = conn.execute('SELECT id FROM users WHERE email = ?', (email,))
    if cursor.fetchone() is not None:
        conn.close()
        return None
    
    user_id = str(uuid.uuid4())
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    try:
        conn.execute(
            'INSERT INTO users (id, name, email, password, user_type) VALUES (?, ?, ?, ?, ?)',
            (user_id, name, email, hashed_password, user_type)
        )
        conn.commit()
        conn.close()
        return User(id=user_id, name=name, email=email, user_type=user_type)
    except Exception:
        conn.close()
        return None


def authenticate_user(email: str, password: str, user_type: str) -> Optional[tuple[User, str]]:
    """Authenticate user and return User object with token"""
    conn = get_db_connection()
    cursor = conn.execute(
        'SELECT id, name, email, password, user_type FROM users WHERE email = ? AND user_type = ?',
        (email, user_type)
    )
    user = cursor.fetchone()
    conn.close()
    
    if user is None:
        return None
    
    stored_password = user['password']
    if isinstance(stored_password, str):
        stored_password = stored_password.encode('utf-8')
    
    if bcrypt.checkpw(password.encode('utf-8'), stored_password):
        token = generate_token(user['id'], user['user_type'])
        return (
            User(id=user['id'], name=user['name'], email=user['email'], user_type=user['user_type']),
            token
        )
    
    return None


def get_all_ulemas() -> List[Dict[str, Any]]:
    """Get list of all Ulema accounts"""
    conn = get_db_connection()
    cursor = conn.execute(
        'SELECT id, name, email, user_type FROM users WHERE user_type = ?',
        ('ulema',)
    )
    ulemas = cursor.fetchall()
    conn.close()
    
    return [
        {
            'id': u['id'],
            'name': u['name'],
            'email': u['email'],
            'expertise': 'Islamic Inheritance',
            'isOnline': True  # Could implement proper online status tracking
        }
        for u in ulemas
    ]


# ============== Chat Management ==============

def format_inheritance_summary(inheritance_data_str: str) -> str:
    """Format inheritance data as a readable summary message"""
    import json
    try:
        data = json.loads(inheritance_data_str)
        
        # Build formatted message
        lines = ["📋 **INHERITANCE CALCULATION SHARED**", ""]
        
        # Asset details
        currency = data.get('currency', 'USD')
        total = data.get('total_amount', 0)
        distributable = data.get('distributable_amount', 0)
        
        lines.append(f"💰 Total Assets: {currency} {total:,.2f}")
        if total != distributable:
            lines.append(f"📊 Distributable Amount: {currency} {distributable:,.2f}")
        lines.append("")
        
        # Heir shares
        lines.append("👥 **Heir Shares:**")
        heir_shares = data.get('heir_shares', [])
        for heir in heir_shares:
            relation = heir.get('relation', 'Unknown')
            count = heir.get('count', 1)
            amount = heir.get('amount', 0)
            percentage = heir.get('percentage', '0')
            
            count_str = f" (×{count})" if count > 1 else ""
            lines.append(f"• {relation}{count_str}: {currency} {amount:,.2f} ({percentage}%)")
        
        lines.append("")
        lines.append("📎 PDF report available for download")
        
        return "\n".join(lines)
    except (json.JSONDecodeError, TypeError, KeyError):
        return "📋 Inheritance calculation has been shared for verification.\n📎 PDF report available for download"


def start_or_get_chat(user_id: str, ulema_id: str, inheritance_data: Optional[str] = None) -> str:
    """Start a new chat or return existing chat ID"""
    conn = get_db_connection()
    
    # Check if inheritance_data is valid (not None, not "null", not empty)
    has_inheritance_data = (
        inheritance_data is not None 
        and inheritance_data != "null" 
        and inheritance_data.strip() != ""
    )
    
    # Check for existing chat
    cursor = conn.execute(
        'SELECT id FROM chats WHERE user_id = ? AND ulema_id = ?',
        (user_id, ulema_id)
    )
    existing = cursor.fetchone()
    
    if existing:
        chat_id = existing['id']
        # Update inheritance data if provided
        if has_inheritance_data:
            conn.execute(
                'UPDATE chats SET inheritance_data = ? WHERE id = ?',
                (inheritance_data, chat_id)
            )
            # Add formatted system message for inheritance data
            formatted_message = format_inheritance_summary(inheritance_data)
            message_id = str(uuid.uuid4())
            conn.execute(
                'INSERT INTO messages (id, chat_id, sender_id, sender_type, content) VALUES (?, ?, ?, ?, ?)',
                (message_id, chat_id, user_id, 'inheritance', formatted_message)
            )
            conn.commit()
    else:
        # Create new chat
        chat_id = str(uuid.uuid4())
        conn.execute(
            'INSERT INTO chats (id, user_id, ulema_id, inheritance_data) VALUES (?, ?, ?, ?)',
            (chat_id, user_id, ulema_id, inheritance_data if has_inheritance_data else None)
        )
        
        # Only add system message if inheritance data is being shared
        if has_inheritance_data:
            formatted_message = format_inheritance_summary(inheritance_data)
            message_id = str(uuid.uuid4())
            conn.execute(
                'INSERT INTO messages (id, chat_id, sender_id, sender_type, content) VALUES (?, ?, ?, ?, ?)',
                (message_id, chat_id, user_id, 'inheritance', formatted_message)
            )
        conn.commit()
    
    conn.close()
    return chat_id


def get_chat_details(chat_id: str, user_id: str) -> Optional[Dict[str, Any]]:
    """Get chat details with authorization check"""
    conn = get_db_connection()
    
    cursor = conn.execute('''
        SELECT c.id, c.user_id, c.ulema_id, c.inheritance_data, c.created_at,
               u1.name as user_name, u2.name as ulema_name
        FROM chats c
        JOIN users u1 ON c.user_id = u1.id
        JOIN users u2 ON c.ulema_id = u2.id
        WHERE c.id = ?
    ''', (chat_id,))
    
    chat = cursor.fetchone()
    conn.close()
    
    if not chat:
        return None
    
    # Check authorization
    if user_id != chat['user_id'] and user_id != chat['ulema_id']:
        return None
    
    return {
        'id': chat['id'],
        'user_id': chat['user_id'],
        'ulema_id': chat['ulema_id'],
        'user_name': chat['user_name'],
        'ulema_name': chat['ulema_name'],
        'inheritance_data': chat['inheritance_data'],
        'created_at': chat['created_at']
    }


def get_chat_messages(chat_id: str, user_id: str, user_type: str) -> Optional[List[Dict[str, Any]]]:
    """Get all messages for a chat"""
    conn = get_db_connection()
    
    # Verify user is part of chat
    cursor = conn.execute(
        'SELECT user_id, ulema_id FROM chats WHERE id = ?',
        (chat_id,)
    )
    chat = cursor.fetchone()
    
    if not chat:
        conn.close()
        return None
    
    if user_id != chat['user_id'] and user_id != chat['ulema_id']:
        conn.close()
        return None
    
    # Get messages
    cursor = conn.execute(
        'SELECT id, sender_id, sender_type, content, timestamp, is_read FROM messages WHERE chat_id = ? ORDER BY timestamp',
        (chat_id,)
    )
    messages = cursor.fetchall()
    
    # Mark messages as read
    other_type = 'ulema' if user_type == 'user' else 'user'
    conn.execute(
        'UPDATE messages SET is_read = 1 WHERE chat_id = ? AND sender_type = ?',
        (chat_id, other_type)
    )
    conn.commit()
    conn.close()
    
    return [
        {
            'id': m['id'],
            'sender_id': m['sender_id'],
            'sender_type': m['sender_type'],
            'content': m['content'],
            'timestamp': m['timestamp'],
            'is_read': bool(m['is_read'])
        }
        for m in messages
    ]


def send_message(chat_id: str, sender_id: str, sender_type: str, content: str) -> Optional[Dict[str, Any]]:
    """Send a message in a chat"""
    conn = get_db_connection()
    
    # Verify sender is part of chat
    cursor = conn.execute(
        'SELECT user_id, ulema_id FROM chats WHERE id = ?',
        (chat_id,)
    )
    chat = cursor.fetchone()
    
    if not chat:
        conn.close()
        return None
    
    if sender_id != chat['user_id'] and sender_id != chat['ulema_id']:
        conn.close()
        return None
    
    # Determine actual sender type based on chat role
    actual_sender_type = 'user' if sender_id == chat['user_id'] else 'ulema'
    
    # Create message
    message_id = str(uuid.uuid4())
    timestamp = datetime.datetime.utcnow().isoformat()
    
    conn.execute(
        'INSERT INTO messages (id, chat_id, sender_id, sender_type, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
        (message_id, chat_id, sender_id, actual_sender_type, content, timestamp)
    )
    conn.commit()
    conn.close()
    
    return {
        'id': message_id,
        'chat_id': chat_id,
        'sender_id': sender_id,
        'sender_type': actual_sender_type,
        'content': content,
        'timestamp': timestamp,
        'is_read': False
    }


def get_ulema_chats(ulema_id: str) -> List[Dict[str, Any]]:
    """Get all chats for an Ulema"""
    conn = get_db_connection()
    
    cursor = conn.execute('''
        SELECT c.id, c.user_id, u.name as user_name, c.created_at
        FROM chats c
        JOIN users u ON c.user_id = u.id
        WHERE c.ulema_id = ?
        ORDER BY c.created_at DESC
    ''', (ulema_id,))
    
    chats = cursor.fetchall()
    chat_list = []
    
    for chat in chats:
        # Get last message
        cursor = conn.execute(
            'SELECT content, timestamp FROM messages WHERE chat_id = ? ORDER BY timestamp DESC LIMIT 1',
            (chat['id'],)
        )
        last_message = cursor.fetchone()
        
        # Count unread
        cursor = conn.execute(
            'SELECT COUNT(*) as count FROM messages WHERE chat_id = ? AND sender_type = ? AND is_read = 0',
            (chat['id'], 'user')
        )
        unread = cursor.fetchone()
        
        chat_list.append({
            'id': chat['id'],
            'user_id': chat['user_id'],
            'user_name': chat['user_name'],
            'last_message': last_message['content'] if last_message else '',
            'last_message_time': last_message['timestamp'] if last_message else chat['created_at'],
            'unread_count': unread['count']
        })
    
    conn.close()
    return chat_list


def get_user_chats(user_id: str) -> List[Dict[str, Any]]:
    """Get all chats for a user"""
    conn = get_db_connection()
    
    cursor = conn.execute('''
        SELECT c.id, c.ulema_id, u.name as ulema_name, c.created_at
        FROM chats c
        JOIN users u ON c.ulema_id = u.id
        WHERE c.user_id = ?
        ORDER BY c.created_at DESC
    ''', (user_id,))
    
    chats = cursor.fetchall()
    chat_list = []
    
    for chat in chats:
        # Get last message
        cursor = conn.execute(
            'SELECT content, timestamp FROM messages WHERE chat_id = ? ORDER BY timestamp DESC LIMIT 1',
            (chat['id'],)
        )
        last_message = cursor.fetchone()
        
        # Count unread
        cursor = conn.execute(
            'SELECT COUNT(*) as count FROM messages WHERE chat_id = ? AND sender_type = ? AND is_read = 0',
            (chat['id'], 'ulema')
        )
        unread = cursor.fetchone()
        
        chat_list.append({
            'id': chat['id'],
            'ulema_id': chat['ulema_id'],
            'ulema_name': chat['ulema_name'],
            'last_message': last_message['content'] if last_message else '',
            'last_message_time': last_message['timestamp'] if last_message else chat['created_at'],
            'unread_count': unread['count']
        })
    
    conn.close()
    return chat_list


# ============== WebSocket Connection Manager ==============

class ConnectionManager:
    """Manages WebSocket connections for real-time chat"""
    
    def __init__(self):
        # chat_id -> list of WebSocket connections
        self.active_connections: Dict[str, List[Any]] = {}
    
    async def connect(self, websocket, chat_id: str):
        """Accept and store WebSocket connection"""
        await websocket.accept()
        if chat_id not in self.active_connections:
            self.active_connections[chat_id] = []
        self.active_connections[chat_id].append(websocket)
    
    def disconnect(self, websocket, chat_id: str):
        """Remove WebSocket connection"""
        if chat_id in self.active_connections:
            if websocket in self.active_connections[chat_id]:
                self.active_connections[chat_id].remove(websocket)
            if not self.active_connections[chat_id]:
                del self.active_connections[chat_id]
    
    async def broadcast_to_chat(self, chat_id: str, message: dict):
        """Send message to all connections in a chat"""
        if chat_id in self.active_connections:
            for connection in self.active_connections[chat_id]:
                try:
                    await connection.send_json(message)
                except Exception:
                    pass  # Connection might be closed


# Global connection manager instance
connection_manager = ConnectionManager()


# Initialize database on module import
init_database()

