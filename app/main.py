from fastapi import FastAPI
from .routes import home, nanny, career, wellness

app = FastAPI()

app.include_router(home.router)
app.include_router(nanny.router)
app.include_router(career.router)
app.include_router(wellness.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to MrNannyApp API!"}
