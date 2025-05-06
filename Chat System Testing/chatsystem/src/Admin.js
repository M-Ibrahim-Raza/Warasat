import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [adminInput, setAdminInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // fetch messages every second

    return () => clearInterval(interval); // clean up interval on unmount
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_messages");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendAdminReply = async () => {
    if (!adminInput.trim()) return;
    try {
      await axios.post("http://localhost:5000/admin_reply", { text: adminInput });
      setAdminInput("");
      // No need to call fetchMessages here because interval is running
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "User" : "Admin"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          value={adminInput}
          onChange={(e) => setAdminInput(e.target.value)}
          placeholder="Type a reply as Admin"
          style={{ width: "70%", marginRight: "10px" }}
        />
        <button onClick={sendAdminReply}>Send Reply</button>
      </div>
    </div>
  );
}
