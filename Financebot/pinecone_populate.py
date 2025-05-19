import pinecone
from sentence_transformers import SentenceTransformer
import os

api_key = os.getenv("PINECONE_API_KEY")  # Replace with your Pinecone API key
index_name = "finance-bot-index"  # Replace with your index name
pc = pinecone.Pinecone(api_key=api_key)

# Initialize the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Sample personal finance-related Q&A data
qa_data = [
    {"question": "What is budgeting?", "answer": "Budgeting is the process of creating a plan to spend your money."},
    {"question": "How do I start saving money?", "answer": "To start saving money, set aside a portion of your income regularly and prioritize savings."},
    {"question": "What is compound interest?", "answer": "Compound interest is the interest on a loan or deposit that is calculated based on both the initial principal and the accumulated interest."},
    {"question": "What are stocks?", "answer": "Stocks are shares of ownership in a company. When you buy stock, you own a small portion of that company."},
    {"question": "What is a mutual fund?", "answer": "A mutual fund is a pool of funds from many investors to invest in a diversified portfolio of assets like stocks, bonds, and other securities."},
    {"question": "What is a 401k?", "answer": "A 401k is a retirement savings plan that allows you to save money for retirement with tax benefits."},
    {"question": "How do credit cards work?", "answer": "Credit cards allow you to borrow money up to a certain limit to make purchases, which you repay later with interest."},
    {"question": "What is an emergency fund?", "answer": "An emergency fund is a savings buffer to cover unexpected expenses like medical bills, car repairs, or job loss."},
    {"question": "What is the difference between a savings account and a checking account?", "answer": "A savings account earns interest on your balance, while a checking account is used for everyday transactions and typically does not earn interest."},
    {"question": "How can I improve my credit score?", "answer": "To improve your credit score, pay your bills on time, reduce debt, and avoid opening too many new credit accounts."},
    {"question": "What is an investment portfolio?", "answer": "An investment portfolio is a collection of investments such as stocks, bonds, and other assets owned by an individual or institution."},
    {"question": "What is tax filing?", "answer": "Tax filing is the process of submitting your financial information to the government for the purpose of paying taxes on your income."},
    {"question": "What is a loan?", "answer": "A loan is a sum of money that is borrowed from a bank or other financial institution, which you are required to repay with interest."},
    {"question": "What is financial planning?", "answer": "Financial planning involves evaluating your financial situation and creating a plan to achieve your future financial goals."},
    {"question": "What is debt consolidation?", "answer": "Debt consolidation is the process of combining multiple loans or debts into one single loan with a lower interest rate."}
]

# Create or connect to the Pinecone index
index = pc.Index(index_name)

# Prepare and insert the data into Pinecone
for entry in qa_data:
    question = entry["question"]
    answer = entry["answer"]
    
    # Embed the question using the sentence transformer model
    question_embedding = model.encode(question).tolist()
    
    # Create the metadata with the answer
    metadata = {"answer": answer}
    
    # Insert the question embedding and metadata into Pinecone
    index.upsert([(question, question_embedding, metadata)])

print(f"Successfully populated the Pinecone index '{index_name}' with personal finance-related Q&A data.")
