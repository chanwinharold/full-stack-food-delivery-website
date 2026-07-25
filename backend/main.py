import logging
import time
from collections import defaultdict
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from routers import users, menus, dishes, commands, delivery_infos, command_details, orders
from fastapi.middleware.cors import CORSMiddleware
from core.config import CORS_ORIGINS


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Tomato Food Delivery API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_rate_limit_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT_WINDOW = 60.0
RATE_LIMIT_MAX_REQUESTS = 30
AUTH_RATE_LIMIT_MAX_REQUESTS = 10


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    key = f"{client_ip}:{request.url.path}"

    _rate_limit_store[key] = [t for t in _rate_limit_store[key] if now - t < RATE_LIMIT_WINDOW]

    if request.url.path.startswith("/auth"):
        limit = AUTH_RATE_LIMIT_MAX_REQUESTS
    else:
        limit = RATE_LIMIT_MAX_REQUESTS

    if len(_rate_limit_store[key]) >= limit:
        return JSONResponse(
            status_code=429,
            content={"data": None, "detail": "Too many requests. Please try again later."},
        )

    _rate_limit_store[key].append(now)
    response = await call_next(request)
    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"data": None, "detail": "An internal server error occurred."},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"data": None, "detail": exc.detail},
    )


app.include_router(users.router)
app.include_router(menus.router)
app.include_router(dishes.router)
app.include_router(commands.router)
app.include_router(delivery_infos.router)
app.include_router(command_details.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {"data": None, "detail": "Application running..."}
