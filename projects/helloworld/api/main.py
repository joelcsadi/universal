# Importing necessary libraries and APIs
from fastapi import FastAPI
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os

## Instantiating APIS and Models

load_dotenv()
model = OpenAIModel('gpt-4o', api_key=os.getenv('OPENAI_API_KEY'))
agent = Agent(model, system_prompt='Be concise, reply with one sentence.')
app = FastAPI()
supabase: Client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

## Defining API endpoints

@app.get("/greeting")
async def get_greeting():
    result = await agent.run('Give me a random greeting')
    response = (
    supabase.table("message")
    .insert({"greeting": result.data, "username": "Joel", "email": "joel@example.com"})
    .execute()
    )
  
    return {"message": result.data}

@app.get("/user")
def get_user():
    return {"username" : "Joel", "email" : "joel@example.com"}

@app.get("/messages")
def get_messages():
    return supabase.table("message").select("*").execute()
