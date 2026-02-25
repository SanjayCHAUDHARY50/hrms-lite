from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from ..database import get_db
from .. import schemas, crud

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


# Mark attendance
@router.post("/", response_model=schemas.AttendanceResponse, status_code=201)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):

    new_attendance, error = crud.mark_attendance(db, attendance)

    if error == "EMPLOYEE_NOT_FOUND":
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    if error == "ALREADY_MARKED":
        raise HTTPException(
            status_code=409,
            detail="Attendance already marked for this date"
        )

    return new_attendance


# Get attendance by employee
@router.get("/{employee_id}", response_model=list[schemas.AttendanceResponse])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):

    return crud.get_attendance_by_employee(db, employee_id)


# Filter attendance by date (BONUS)
@router.get("/")
def filter_by_date(attendance_date: date, db: Session = Depends(get_db)):

    return crud.get_attendance_by_date(db, attendance_date)