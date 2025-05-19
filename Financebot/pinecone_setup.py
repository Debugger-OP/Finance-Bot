import os
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer

# Replace with your Pinecone API key
api_key = os.getenv("PINECONE_API_KEY")

# Initialize Pinecone with API key
pc = Pinecone(api_key=api_key)

# Index name you will use later in views
index_name = "finance-bot-index"  # You can change the name

# Check if the index exists, and create it if not
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=384,  # Choose the dimension of the embedding (e.g., 384 for 'all-MiniLM-L6-v2')
        metric='cosine',  # You can change the metric (e.g., cosine, euclidean, etc.)
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'  # You can change this based on your preferred region
        )
    )

# Connect to the created index
index = pc.Index(index_name)

print("✅ Pinecone index created (if not already created) and ready to use.")
