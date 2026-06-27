from fastapi import FastAPI
from routers import users, menus, dishes


app = FastAPI()

app.include_router(users.router)
app.include_router(menus.router)
app.include_router(dishes.router)

@app.get("/")
def root():
    return {"data": None, "detail": "Application running..."}