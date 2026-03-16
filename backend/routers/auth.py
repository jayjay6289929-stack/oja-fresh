from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.user import UserCreate, UserOut, TokenOut
from services.user_service import create_user, get_user_by_email
from services.auth_service import verify_password, create_token

router = APIRouter()


@router.post("/register", response_model=TokenOut, status_code=201)
def register(body: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, body.email, body.password)
    return TokenOut(access_token=create_token(user.id), user=UserOut.model_validate(user))


@router.post("/login", response_model=TokenOut)
def login(body: UserCreate, db: Session = Depends(get_db)):
    user = get_user_by_email(db, body.email)
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    return TokenOut(access_token=create_token(user.id), user=UserOut.model_validate(user))
