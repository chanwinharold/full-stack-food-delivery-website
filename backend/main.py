from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def root():
    return {"data": None, "detail": "Application running..."}