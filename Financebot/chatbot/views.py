from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import os

TOGETHER_API_KEY =os.getenv("TOGETHER_API_KEY")  # Replace with your key
TOGETHER_API_URL = os.getenv("TOGETHER_API_URL")
MODEL_NAME = os.getenv("MODEL_NAME")  

@api_view(['POST'])
def chat(request):
    user_input = request.data.get("user_input")

    if not user_input:
        return Response({"error": "No input provided"}, status=status.HTTP_400_BAD_REQUEST)

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL_NAME,
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful personal finance assistant. Answer user questions with smart, practical financial advice."
            },
            {
                "role": "user",
                "content": user_input
            }
        ],
        "temperature": 0.7,
        "max_tokens": 512
    }

    try:
        res = requests.post(TOGETHER_API_URL, headers=headers, json=data)
        res_data = res.json()

        if res.status_code == 200:
            return Response({"response": res_data["choices"][0]["message"]["content"].strip()})
        else:
            return Response({"error": res_data.get("error", "API error")}, status=500)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
