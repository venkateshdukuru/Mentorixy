# Mentorixy

AI + Human Mentorship Platform — connecting learners with AI-powered and human mentors for career, tech, education, and life guidance.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, Vercel Serverless |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| AI | Google Gemini API |

---

## Project Structure

```
Mentorixy/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── pages/             # LoginPage, RegisterPage, DashboardPage, etc.
│   │   ├── components/        # Navbar, ChatBot, ExpertCard, BookingModal, etc.
│   │   ├── context/           # AuthContext (JWT auth state)
│   │   └── main.jsx
│   ├── .env                   # VITE_BACKEND_URL, VITE_GROQ_API_KEY
│   ├── vite.config.js
│   └── vercel.json            # Frontend Vercel config
│
├── backend/                   # Node.js API
│   ├── api/
│   │   ├── auth.js            # Register / Login / Me
│   │   ├── chat.js            # AI chat (Gemini)
│   │   ├── experts.js         # Expert profiles
│   │   ├── questions.js       # Q&A forum
│   │   ├── sessions.js        # Session booking
│   │   └── server.js          # Express server (local dev only)
│   ├── lib/
│   │   ├── db.js              # MongoDB connection
│   │   └── models/            # User, Expert, Question, Session schemas
│   ├── .env                   # MONGODB_URI, JWT_SECRET, GEMINI_API_KEY, etc.
│   └── vercel.json            # Backend Vercel config
│
└── README.md
```

---

## Local Development

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd Mentorixy
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

Start the backend:

```bash
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_GROQ_API_KEY=your_groq_api_key
```

Start the frontend:

```bash
npm run dev
# Runs on http://localhost:5173
```

The Vite dev server proxies all `/api/*` requests to the backend automatically.

---

## API Endpoints

All endpoints are on the backend (`/api/*`).

### Auth — `/api/auth`

| Method | Query | Description |
|--------|-------|-------------|
| POST | `?action=register` | Register a new user |
| POST | `?action=login` | Login and get JWT |
| GET  | `?action=me` | Get current user (requires `Authorization: Bearer <token>`) |

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET / POST | `/api/questions` | List or create questions |
| GET / POST | `/api/experts` | List or create expert profiles |
| POST | `/api/sessions` | Book a mentorship session |
| POST | `/api/chat` | Send message to Gemini AI |

---

## Deployment (Vercel)

Frontend and backend are deployed as **two separate Vercel projects**.

### Backend

1. Create a new Vercel project, set root directory to `backend/`
2. Add environment variables in Vercel dashboard:

```
MONGODB_URI
JWT_SECRET
GEMINI_API_KEY
FRONTEND_URL     # your deployed frontend URL e.g. https://mentorixy.vercel.app
```

### Frontend

1. Create a new Vercel project, set root directory to `frontend/`
2. Add environment variables in Vercel dashboard:

```
VITE_BACKEND_URL    # your deployed backend URL e.g. https://mentorixy-api.vercel.app
VITE_GROQ_API_KEY
```

### Or deploy via CLI

```bash
# Backend
cd backend
vercel --prod

# Frontend
cd frontend
vercel --prod
```

---

## Environment Variables Reference

### `backend/.env`

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) |
| `GEMINI_API_KEY` | Google Gemini API key |
| `FRONTEND_URL` | Frontend origin for CORS |
| `BACKEND_URL` | Backend base URL |

### `frontend/.env`

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend base URL (proxied in dev) |
| `VITE_GROQ_API_KEY` | Groq API key |

---

## Get API Keys

- **MongoDB Atlas** — [cloud.mongodb.com](https://cloud.mongodb.com)
- **Google Gemini** — [aistudio.google.com](https://aistudio.google.com/app/apikey)
- **Groq** — [console.groq.com](https://console.groq.com)
