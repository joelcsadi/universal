# Importing necessary libraries and APIs
from fastapi import FastAPI
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

class PromptRequest(BaseModel):
    prompt: str


## Instantiating APIS and Models

load_dotenv()
model = OpenAIModel('gpt-4o', api_key=os.getenv('OPENAI_API_KEY'))
agent = Agent(model, system_prompt='Be concise, reply with one sentence.')
app = FastAPI()
supabase: Client = create_client(os.getenv('SUPABASE_URL'), os.getenv('SUPABASE_KEY'))

# Add middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  #Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


## Defining API endpoints

@app.post("/prompt")
async def post_prompt(request: PromptRequest):
    result = await agent.run(request.prompt)
    supabase.table("prompts").insert({"prompt": request.prompt,
                                      "response": result.data,
                                      "username": "Joel"}).execute()
    return {"message": result.data}

@app.get("/prompts")
def get_prompts():
    return supabase.table("prompts").select("*").execute()
