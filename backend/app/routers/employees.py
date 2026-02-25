from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# CREATE employee
@router.post("/", response_model=schemas.EmployeeResponse, status_code=201)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    new_employee, error = crud.create_employee(db, employee)

    if error == "EMPLOYEE_ID_EXISTS":
        raise HTTPException(
            status_code=409,
            detail="Employee ID already exists"
        )

    if error == "EMAIL_EXISTS":
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    return new_employee


# GET all employees
@router.get("/", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):

    employees = crud.get_employees(db)

    return employees


# DELETE employee
@router.delete("/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):

    success = crud.delete_employee(db, employee_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {"message": "Employee deleted successfully"}