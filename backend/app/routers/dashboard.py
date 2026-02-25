from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    return crud.dashboard_summary(db)


@router.get("/employee/{employee_id}")
def employee_summary(employee_id: int, db: Session = Depends(get_db)):

    return crud.employee_summary(db, employee_id)