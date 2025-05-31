import os
from dotenv import load_dotenv

# Load environment variables from the .env file located one level above the src directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Initialize FastAPI app
app = FastAPI()

# Configure the Gemini API

# Define the request model
class ChatRequest(BaseModel):
    message: str

# Define the response model
class ChatResponse(BaseModel):
    response: str

# Create a chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Initialize LangChain with Gemini
        llm = ChatGoogleGenerativeAI(model='gemini-1.5-flash', api_key=os.getenv('GEMINI_API_KEY'))
        print(os.getenv('GEMINI_API_KEY'))
        prompt = PromptTemplate(input_variables=["message"], template="You are a helpful assistant. User: {message}")
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain.run(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI server on port 8001
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)