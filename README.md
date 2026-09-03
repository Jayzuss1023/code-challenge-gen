# Code Challenge Generator

A small full stack app that generates multiple choice coding questions with AI. You pick a difficulty, get a question with four answers, and see an explanation after you choose.

I built this to practice putting a React frontend together with a FastAPI backend, Clerk auth, and a simple quota so people can’t spam the OpenAI API.

## What it does

- **Sign in / sign up** with Clerk. Unsigned users get sent to `/sign-in`.
- **Generate a challenge** (easy / medium / hard). The backend asks GPT for a JSON question: title, four options, correct answer index, and an explanation.
- **Answer the question** in the UI. Options highlight correct/incorrect, then the explanation shows.
- **Daily quota** of 10 generations per user. After 24 hours it resets.
- **History** of challenges you’ve generated, loaded from the database.
- **Clerk webhook** on `user.created` so a new user gets a quota row when they sign up.

If OpenAI fails, the backend falls back to a hardcoded Python list question so the app doesn’t just die.

## Tech

| Layer | Stack |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, React Router, `@clerk/react` |
| Backend | FastAPI, Uvicorn, SQLAlchemy, SQLite |
| Auth | Clerk (JWT on API requests, Svix for webhook verify) |
| AI | OpenAI (`gpt-3.5-turbo-0125`) |

Frontend sends the Clerk session token as `Authorization: Bearer …`. FastAPI checks it with the Clerk backend SDK before generating or listing challenges.

## API (backend)

- `POST /api/generate-challenge` — body: `{ "difficulty": "easy" | "medium" | "hard" }`
- `GET /api/my-history` — generated challenges of the signed-in user
- `GET /api/quota` — remaining generations plus last reset
- `POST /webhooks/clerk` — Clerk `user.created` (Svix signature)

## Local setup

You’ll need Node, Python 3.11+, a Clerk app, and an OpenAI key.
