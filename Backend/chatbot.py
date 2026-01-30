"""
Islamic Inheritance Chatbot Module

This module provides RAG-based question answering for Islamic inheritance queries.
Uses Pinecone for vector storage and OpenAI for answer generation.
"""

import os
import pickle
from pathlib import Path
from typing import List, Optional

import numpy as np
import fitz  # PyMuPDF
import pinecone
import openai
import unicodedata
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv


class InheritanceChatbot:
    """
    RAG-based chatbot for Islamic inheritance questions
    """
    
    def __init__(
        self,
        pinecone_api_key: Optional[str] = None,
        openai_api_key: Optional[str] = None,
        index_name: str = "inheritance-rules-index",
        embeddings_path: Optional[str] = None
    ):
        # Load environment variables
        load_dotenv("keys.env")
        
        self.pinecone_api_key = pinecone_api_key or os.getenv("PINECONE_API_KEY")
        self.openai_api_key = openai_api_key or os.getenv("OPENAI_API_KEY")
        self.index_name = index_name
        
        # Initialize models
        self.embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        
        # Initialize Pinecone
        self.pc = pinecone.Pinecone(api_key=self.pinecone_api_key)
        self._ensure_index_exists()
        self.index = self.pc.Index(self.index_name)
        
        # Initialize OpenAI client
        self.openai_client = openai.OpenAI(api_key=self.openai_api_key)
        
        # Load or create embeddings
        self.embeddings_path = embeddings_path or "embeddings.pkl"
        self.chunks = []
        self.embeddings = None
        self._load_embeddings()
    
    def _ensure_index_exists(self) -> None:
        """Create Pinecone index if it doesn't exist"""
        existing_indexes = [idx.name for idx in self.pc.list_indexes()]
        
        if self.index_name not in existing_indexes:
            self.pc.create_index(
                name=self.index_name,
                dimension=384,  # all-MiniLM-L6-v2 dimension
                metric="cosine",
                spec=pinecone.ServerlessSpec(cloud="aws", region="us-east-1")
            )
    
    def _load_embeddings(self) -> None:
        """Load embeddings from pickle file if exists"""
        if Path(self.embeddings_path).exists():
            with open(self.embeddings_path, "rb") as f:
                self.chunks, self.embeddings = pickle.load(f)
    
    def index_pdf(self, pdf_path: str) -> int:
        """
        Index a PDF document for RAG retrieval
        
        Args:
            pdf_path: Path to PDF file
            
        Returns:
            Number of chunks indexed
        """
        # Extract text from PDF
        with fitz.open(pdf_path) as doc:
            text_data = [page.get_text("text") for page in doc]
        
        full_text = "\n".join(text_data)
        
        # Normalize text
        full_text = unicodedata.normalize("NFKD", full_text)
        full_text = full_text.encode("ascii", "ignore").decode()
        
        # Split into chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=700, chunk_overlap=100)
        self.chunks = splitter.split_text(full_text)
        
        # Create embeddings
        self.embeddings = self.embedding_model.encode(self.chunks, convert_to_tensor=True)
        
        # Save embeddings
        with open(self.embeddings_path, "wb") as f:
            pickle.dump((self.chunks, self.embeddings), f)
        
        # Upload to Pinecone
        vectors = []
        for i, chunk in enumerate(self.chunks):
            embedding = self.embedding_model.encode(chunk, convert_to_tensor=False).tolist()
            vectors.append((str(i), embedding, {"text": chunk}))
        
        # Batch upsert
        batch_size = 100
        for i in range(0, len(vectors), batch_size):
            self.index.upsert(vectors[i:i + batch_size])
        
        return len(vectors)
    
    def query_pinecone(
        self, 
        question: str, 
        top_k: int = 3, 
        threshold: float = 0.3
    ) -> List[str]:
        """
        Query Pinecone for relevant context
        
        Args:
            question: User's question
            top_k: Number of results to retrieve
            threshold: Minimum similarity score
            
        Returns:
            List of relevant text chunks
        """
        query_embedding = self.embedding_model.encode(
            question, convert_to_numpy=True
        ).astype(np.float32).tolist()
        
        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True,
            include_values=False
        )
        
        filtered_responses = [
            match["metadata"]["text"] 
            for match in results["matches"] 
            if match["score"] >= threshold
        ]
        
        return filtered_responses if filtered_responses else ["Unable to answer this question"]
    
    def generate_answer(self, query: str, context: List[str]) -> str:
        """
        Generate answer using OpenAI GPT
        
        Args:
            query: User's question
            context: Retrieved context chunks
            
        Returns:
            Generated answer
        """
        context_text = "\n\n".join(context)
        prompt = f"Use the following information to answer the query:\n\n{context_text}\n\nQuery: {query}\nAnswer:"
        
        response = self.openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI assistant that provides Islamic inheritance answers based on provided documents."
                },
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
        )
        
        return response.choices[0].message.content
    
    def get_answer(self, query: str) -> str:
        """
        Main method to get answer for a question
        
        Args:
            query: User's question
            
        Returns:
            Generated answer based on retrieved context
        """
        context = self.query_pinecone(query, top_k=3)
        return self.generate_answer(query, context)


# Singleton instance for use in API
_chatbot_instance: Optional[InheritanceChatbot] = None


def get_chatbot() -> InheritanceChatbot:
    """Get or create chatbot singleton instance"""
    global _chatbot_instance
    if _chatbot_instance is None:
        _chatbot_instance = InheritanceChatbot()
    return _chatbot_instance

