<div align="center">

# 🍅 Tomato

### Full-Stack Food Delivery Platform

**Where clean architecture meets real-world engineering.**

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat&logo=vite&logoColor=white)

[Live Demo](#-deployment) · [API Docs](#-api-endpoints) · [Local Setup](#-getting-started-locally)

</div>

---

## The Story Behind Tomato

This project started with a simple question: **could a student build something production-ready?**

Not a toy CRUD app. Not a tutorial clone. A real, layered, secure full-stack application — the kind you'd find behind the login screen of an actual startup. So I chose a domain everyone understands: **food delivery**. You pick dishes, fill your cart, enter your address, pay, and track your order. Simple for the user. Complex under the hood.

What you see here is not just code. It's the result of late nights debugging CORS errors, refactoring database connections at 2 AM, and learning — the hard way — why architecture matters.

---

## The Architecture

I designed the backend around a **4-layer architecture** that keeps concerns separated and the codebase maintainable:

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND                              │
│              React 19 · Tailwind CSS v4 · Vite 8            │
│                                                             │
│   Pages ──▶ Contexts (Auth, Cart, Menu, Alert)              │
│          ──▶ Services (api, auth, orders)                    │
│          ──▶ Components (Navbar, Footer, Alert, ...)         │
├─────────────────────────────────────────────────────────────┤
│                     HTTP / Cookies                           │
├─────────────────────────────────────────────────────────────┤
│                       BACKEND                               │
│                    FastAPI + Python                          │
│                                                             │
│   Routers ──▶ Services ──▶ Repositories ──▶ Database        │
│                                                             │
│   ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│   │  Routers  │→│ Services  │→│Repositories │→│    DB     │ │
│   │ (HTTP)    │  │ (Logic)  │  │ (SQL)       │  │ (psycopg)│ │
│   └──────────┘  └──────────┘  └────────────┘  └──────────┘ │
├─────────────────────────────────────────────────────────────┤
│                  PostgreSQL (Neon)                           │
│   USERS · MENUS · DISHES · COMMANDS · COMMAND_DETAILS        │
│   PAYMENTS · DELIVERY_INFOS                                  │
└─────────────────────────────────────────────────────────────┘
```

Every request flows through this pipeline. The router handles HTTP. The service handles business logic. The repository handles SQL. The database executes. **No layer touches another layer's concern.**

---

## The Tech Stack — And Why

### Backend
| Technology | Why |
|---|---|
| **FastAPI** | Async-ready, automatic OpenAPI docs, type-safe request/response validation with Pydantic |
| **psycopg 3** | Modern PostgreSQL adapter for Python. Raw SQL — no ORM overhead, full control over queries |
| **Pydantic** | Request/response schemas with built-in validation. Email checks, min-length rules, type safety — all declarative |
| **pwdlib** | Password hashing with Argon2 (the OWASP-recommended algorithm) |
| **PyJWT** | Stateless JWT tokens stored in HTTP-only cookies for secure auth |
| **python-dotenv** | Environment variable management across dev and production |

### Frontend
| Technology | Why |
|---|---|
| **React 19** | Latest concurrent features, improved performance, modern hooks |
| **React Router v7** | Client-side routing with nested layouts, protected routes, and clean URL structure |
| **Tailwind CSS v4** | Utility-first styling with the new `@import` syntax — no config file needed |
| **Vite 8** | Lightning-fast HMR and builds. The DX difference is real |
| **Context API** | Chosen over Redux for simplicity — 4 contexts handle all global state cleanly |

### Infrastructure
| Service | Role |
|---|---|
| **Vercel** | Frontend hosting with automatic deployments and SPA rewrite rules |
| **Render** | Backend API hosting with free tier and environment variable management |
| **Neon** | Serverless PostgreSQL with branching, connection pooling, and SSL support |

---

## Features — What Actually Got Built

### Authentication & Security
- **HTTP-only cookie-based JWT auth** — tokens never touch localStorage, immune to XSS
- **Password hashing with Argon2** — the same algorithm used by major security-conscious platforms
- **Rate limiting middleware** — 30 req/min general, 10 req/min for auth endpoints (brute-force protection)
- **CORS configuration from environment** — no hardcoded origins, works across dev/production
- **Global exception handlers** — no stack traces leak to the client, ever
- **Protected routes** — both backend (Depends) and frontend (ProtectedRoute component)

### Order Flow
1. **Browse** → Menu page with category filters and search
2. **Select** → Add dishes to cart with quantity controls
3. **Cart** → Review items, quantities, and running total
4. **Checkout** → Delivery information form with field validation
5. **Payment** → Simulated Stripe-style interface with test card (auto-filled, disabled)
6. **Confirm** → Modal confirmation before processing
7. **Done** → Atomic order creation in the database, cart cleared, redirect home

### Database Design
Seven tables, foreign key relationships, and seeded data:

```
USERS ──< COMMANDS ──< COMMAND_DETAILS >── DISHES ──< MENUS
              │
              ├──< DELIVERY_INFOS
              └──< PAYMENTS
```

| Table | Records | Purpose |
|---|---|---|
| MENUS | 8 | Food categories (salad, rolls, desserts, etc.) |
| DISHES | 32 | Individual items with name, description, price, rating |
| USERS | — | Registered accounts |
| COMMANDS | — | Orders linked to users |
| COMMAND_DETAILS | — | Line items per order (dish, quantity, unit price) |
| DELIVERY_INFOS | — | Shipping address per order |
| PAYMENTS | — | Payment records with status tracking |

### UI/UX
- **Skeleton loaders** — every data-fetching page shows loading states
- **Error boundary** — catches and displays React rendering errors gracefully
- **Toast notifications** — status-colored alerts (green/red/amber) with dismiss
- **Responsive design** — works on desktop and mobile
- **Search** — inline search in Navbar, filters Menu page in real-time
- **Cart persistence** — survives page refreshes via localStorage
- **Protected routes** — unauthenticated users are redirected to login

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | No | Register a new account |
| `POST` | `/auth/login` | No | Login (sets HTTP-only cookie) |
| `POST` | `/auth/logout` | No | Logout (clears cookie) |
| `GET` | `/auth/me` | Yes | Get current user info |
| `GET` | `/menus/` | No | List all menu categories |
| `GET` | `/menus/{id}` | No | Get dishes in a category |
| `GET` | `/dishes/` | No | List all dishes |
| `GET` | `/dishes/top` | No | Top 10 dishes by rating |
| `POST` | `/orders/` | Yes | Create an order (items + delivery) |
| `GET` | `/orders/` | Yes | Get all orders for current user |

---

## Getting Started Locally

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL (local or Neon)

### 1. Clone & Setup Database

```bash
git clone https://github.com/your-username/tomato.git
cd tomato

# Create the database
createdb tomato_db

# Run migrations in order
psql -d tomato_db -f backend/database/migrations/001_create_users.sql
psql -d tomato_db -f backend/database/migrations/002_create_menus.sql
psql -d tomato_db -f backend/database/migrations/003_create_dishes.sql
psql -d tomato_db -f backend/database/migrations/004_create_commands.sql
psql -d tomato_db -f backend/database/migrations/005_create_payments.sql
psql -d tomato_db -f backend/database/migrations/006_create_command-details.sql
psql -d tomato_db -f backend/database/migrations/007_create_delivery-infos.sql
```

### 2. Backend

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run the server
uvicorn main:app --reload --port 8000
```

API docs available at: `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Set VITE_API_URL to http://localhost:8000

# Run the dev server
npm run dev
```

App available at: `http://localhost:5173`

---

## Deployment

### Frontend → Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Git Repository
3. Select the **frontend** folder as the root directory
4. Framework: **Vite**, Build command: `npm run build`, Output dir: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com`
6. Deploy

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Python
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables (from `.env.example`):
   - `DATABASE_URL` = your Neon connection string
   - `JWT_SECRET_KEY` = generate a strong random key
   - `JWT_EXPIRES_IN` = `120`
   - `JWT_ALGORITHM` = `HS256`
   - `CORS_ORIGINS` = `https://your-app.vercel.app`
   - `COOKIE_SECURE` = `true`
5. Deploy

### Database → Neon

1. Go to [neon.tech](https://neon.tech) → Create a project
2. Copy the connection string from the dashboard
3. Run the migrations via the Neon SQL editor (copy/paste each migration file)
4. Paste the connection string as `DATABASE_URL` in Render

### Post-Deployment Checklist

- [ ] Frontend builds without errors on Vercel
- [ ] Backend starts on Render (check logs)
- [ ] `CORS_ORIGINS` includes your Vercel URL
- [ ] `COOKIE_SECURE` is `true` in production
- [ ] `DATABASE_URL` connects to Neon
- [ ] All 7 migrations ran successfully
- [ ] Signup → Login → Add to Cart → Checkout → Payment works end-to-end

---

## Lessons Learned

**Architecture is not optional.** The 4-layer backend structure (Routers → Services → Repositories → DB) felt like overkill at first. But when I needed to swap the database connection method for Neon's connection strings, I changed exactly **two files** — `config.py` and `connection.py`. Nothing else touched. That's the payoff.

**CORS will humble you.** The most time I spent on a "simple" feature was getting cookies to work across different origins. The fix: environment-driven CORS origins, `SameSite=Lax`, and `COOKIE_SECURE` tied to the deployment environment.

**State management doesn't need Redux.** Four React Contexts (Auth, Cart, Menu, Alert) handle everything. Cart persists to localStorage. Menu data is cached. Auth checks on mount. No reducers, no actions, no boilerplate — just `useState` and `useEffect` in providers.

**Database connections are not free.** Each request opened a new connection. On Render's free tier with Neon's connection limits, this broke fast. The lesson: connection management matters, and "it works on localhost" is not a production guarantee.

**Security is layers, not features.** HTTP-only cookies. Argon2 hashing. Rate limiting. Input validation with Pydantic. Global exception handlers. CORS from env. Cookie secure flag. None of these alone is "security." Together, they're defense in depth.

---

## Project Structure

```
tomato/
├── backend/
│   ├── core/              # Config, security (JWT, hashing)
│   ├── database/          # Connection management, migrations
│   ├── models/            # Python dataclasses for DB rows
│   ├── repositories/      # SQL queries (the only layer that touches DB)
│   ├── routers/           # HTTP endpoints (input validation, response formatting)
│   ├── schemas/           # Pydantic models (request/response contracts)
│   ├── services/          # Business logic (the "brain" of each feature)
│   ├── utils/
│   ├── main.py            # FastAPI app, middleware, exception handlers
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment template
├── frontend/
│   ├── src/
│   │   ├── assets/        # Icons, images, SVGs
│   │   ├── components/    # Reusable UI (Navbar, Footer, Alert, ...)
│   │   ├── contexts/      # React Context providers (Auth, Cart, Menu, Alert)
│   │   ├── pages/         # Route-level components (Home, Menu, Cart, ...)
│   │   ├── services/      # API calls, auth, order functions
│   │   ├── styles/        # Global CSS (Tailwind import)
│   │   ├── App.jsx        # Router + Provider tree
│   │   └── main.jsx       # React root
│   ├── vercel.json        # SPA rewrite rules for Vercel
│   ├── package.json
│   └── .env.example       # Environment template
├── render.yaml            # Render deployment config
└── README.md              # You are here
```

---

## Author

**Chanwin Harold** — Computer Science student who believes great software is built one architectural decision at a time.

---

<div align="center">

*Built with intention. Deployed with confidence.*

</div>
