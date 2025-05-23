from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM, TextGenerationPipeline
import torch

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "LLM server is running. Use POST /v1/completions"}

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct", device_map="auto", torch_dtype=torch.float16)
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct"")
pipeline = TextGenerationPipeline(model=model, tokenizer=tokenizer)

class CompletionRequest(BaseModel):
    model: str
    prompt: str
    max_tokens: int
    temperature: float

@app.post("/v1/completions")
async def generate_completion(data: CompletionRequest):
    generated = pipeline(
        data.prompt,
        max_length=data.max_tokens,
        do_sample=True,
        temperature=data.temperature
    )[0]["generated_text"]
    return [{"generated_text": generated}]
