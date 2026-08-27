from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware





app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credential=True,
    allow_methods=["*"],
    allow_headers=["*"]
)