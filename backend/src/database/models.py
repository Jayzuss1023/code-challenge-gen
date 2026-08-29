from sqlalchemy.orm import sessionmaker, Mapped, mapped_column
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

# Initialize db and base
engine = create_engine('sqlite:///database.db', echo=True)
Base = declarative_base()

class Challenge(Base):
    __tablebane__ = 'challenges'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    difficulty: Mapped[str] = mapped_column(String, nullable=False)
    date_created: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    created_by: Mapped[str] = mapped_column(String, nullable=False)
    options: Mapped[str] = mapped_column(String, nullable=False)
    correct_answer_id: Mapped[int] = mapped_column(Integer, nullable=False)
    explanation: Mapped[str] = mapped_column(String, nullable=False)


class ChallengeQuota(Base):
    __tablename__ = 'challenge_quotas'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    quota_remaining: Mapped[int] = mapped_column(Integer, nullable=False, default=10)
    last_reset_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)


# Create tables in db
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Yield db
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()