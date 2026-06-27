from fastapi import FastAPI
from routers import users, menus


app = FastAPI()

app.include_router(users.router)
app.include_router(menus.router)

@app.get("/")
def root():
    return {"data": None, "detail": "Application running..."}