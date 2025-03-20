#pip install python-docx sentence-transformers langchain pinecone openai pymupdf torch transformers accelerate bitsandbytes flask flask-cors python-dotenv
#pip install --upgrade sympy transformers

from docx import Document
import pinecone
import torch
import openai
import numpy as np
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
import fitz
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from flask import Flask, request, jsonify
from flask_cors import CORS
import unicodedata
import pickle
from dotenv import load_dotenv
import os

load_dotenv("keys.env") 
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

file_path = "A Practical Guide to Islamic Law of Inheritance_250313_011139.pdf"

# Extract text from the PDF
with fitz.open(file_path) as doc:
    text_data = []
    for page in doc:
        text_data.append(page.get_text("text")) 

full_text = "\n".join(text_data)

#print(full_text[:1000])  

#--------------------------------------------------------------------------------------------

import unicodedata

full_text = unicodedata.normalize("NFKD", full_text)

full_text = full_text.encode("ascii", "ignore").decode()

#print(full_text[:1000])

#--------------------------------------------------------------------------------------------

#Create vector embeddings for the extracted text
model = SentenceTransformer("all-MiniLM-L6-v2")

splitter = RecursiveCharacterTextSplitter(chunk_size=700, chunk_overlap=100)
chunks = splitter.split_text(full_text)

embeddings = model.encode(chunks, convert_to_tensor=True)

with open("embeddings.pkl", "wb") as f:
    pickle.dump((chunks, embeddings), f)

print(f"Fixed Embedding Shape: {embeddings.shape}")

#--------------------------------------------------------------------------------------------

#Create an index in pinecone for storing vector embeddings
pc = pinecone.Pinecone(api_key=PINECONE_API_KEY)

index_name = "inheritance-rules-index"

existing_indexes = [index.name for index in pc.list_indexes()]

if index_name in existing_indexes:
    print(f"Index '{index_name}' already exists.")
else:
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=pinecone.ServerlessSpec(cloud="aws", region="us-east-1")
    )

#--------------------------------------------------------------------------------------------

#Store the vector embeddings in pinecone
index = pc.Index(index_name)

vectors = []
for i, chunk in enumerate(chunks):
    embedding = model.encode(chunk, convert_to_tensor=False).tolist()
    vectors.append((str(i), embedding, {"text": chunk}))

batch_size = 100
for i in range(0, len(vectors), batch_size):
    index.upsert(vectors[i : i + batch_size])

print(f"Stored {len(vectors)} text chunks in Pinecone!")

#--------------------------------------------------------------------------------------------

#Query to retrive context from pinecone through cosine similarity
def query_pinecone(question, top_k=3, threshold=0.3):
    query_embedding = model.encode(question, convert_to_numpy=True).astype(np.float32).tolist()

    results = index.query(vector=query_embedding, top_k=top_k, include_metadata=True, include_values=False)

    filtered_responses = [
        match["metadata"]["text"] for match in results["matches"] if match["score"] >= threshold
    ]

    return filtered_responses if filtered_responses else ["Unable to answer this question"]

user_question = "Explain Masla Aul?"
retrieved_texts = query_pinecone(user_question)

#for i, text in enumerate(retrieved_texts):
    #print(f"Answer {i+1}:\n{text}\n")

#--------------------------------------------------------------------------------------------

# Initialize Flask App 
app = Flask(__name__)
CORS(app)  

client = openai.OpenAI(api_key=OPENAI_API_KEY)

def generate_answer(query, context):
    
    prompt = f"Use the following information to answer the query:\n\n{context}\n\nQuery: {query}\nAnswer:"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI assistant that provides Islamic inheritance answers based on provided documents."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100
    )

    return response.choices[0].message.content  

@app.route("/get_answer", methods=["POST"])
def get_answer():
    """
    API endpoint that takes a user query, retrieves context, and generates a response.
    """
    try:
        data = request.json
        query = data.get("query", "")

        if not query:
            return jsonify({"error": "Query is required"}), 400

        retrieved_context = query_pinecone(query, top_k=3)

        final_answer = generate_answer(query, retrieved_context)

        return jsonify({"answer": final_answer})  

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  # Runs on http://127.0.0.1:5000


#--------------------------------------------------------------------------------------------