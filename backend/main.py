from fastapi import FastAPI
from routers import users, menus, dishes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(menus.router)
app.include_router(dishes.router)

@app.get("/")
def root():
    return {"data": None, "detail": "Application running..."}