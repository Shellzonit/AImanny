from app.database import engine
from app.models.user_models import User
from app.models.job_models import Job
from app.models.message_models import Message

# Create all tables
User.metadata.create_all(bind=engine)
Job.metadata.create_all(bind=engine)
Message.metadata.create_all(bind=engine)

print("Database tables created.")
