from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date
from sqlalchemy import func

# Create employee
def create_employee(db: Session, employee: schemas.EmployeeCreate):

    # check duplicate employee_id
    existing_id = db.query(models.Employee).filter(
        models.Employee.employee_id == employee.employee_id
    ).first()

    if existing_id:
        return None, "EMPLOYEE_ID_EXISTS"

    # check duplicate email
    existing_email = db.query(models.Employee).filter(
        models.Employee.email == employee.email
    ).first()

    if existing_email:
        return None, "EMAIL_EXISTS"

    new_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department,
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee, None


# Get all employees
def get_employees(db: Session):
    return db.query(models.Employee).order_by(models.Employee.id.desc()).all()


# Delete employee
def delete_employee(db: Session, employee_id: int):

    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        return False

    db.delete(employee)
    db.commit()

    return True

# Mark attendance
def mark_attendance(db: Session, attendance):

    # check employee exists
    employee = db.query(models.Employee).filter(
        models.Employee.id == attendance.employee_db_id
    ).first()

    if not employee:
        return None, "EMPLOYEE_NOT_FOUND"

    # prevent duplicate attendance same date
    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_db_id == attendance.employee_db_id,
        models.Attendance.date == attendance.date
    ).first()

    if existing:
        return None, "ALREADY_MARKED"

    new_attendance = models.Attendance(
        employee_db_id=attendance.employee_db_id,
        date=attendance.date,
        status=attendance.status.lower()
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance, None


# Get attendance by employee
def get_attendance_by_employee(db: Session, employee_id: int):

    return db.query(models.Attendance).filter(
        models.Attendance.employee_db_id == employee_id
    ).order_by(models.Attendance.date.desc()).all()


# Filter attendance by date (BONUS)
def get_attendance_by_date(db: Session, attendance_date: date):

    return db.query(models.Attendance).filter(
        models.Attendance.date == attendance_date
    ).all()


# Employee summary (BONUS)
def employee_summary(db: Session, employee_id: int):

    present = db.query(func.count(models.Attendance.id)).filter(
        models.Attendance.employee_db_id == employee_id,
        models.Attendance.status == "present"
    ).scalar()

    absent = db.query(func.count(models.Attendance.id)).filter(
        models.Attendance.employee_db_id == employee_id,
        models.Attendance.status == "absent"
    ).scalar()

    return {
        "total_present": present,
        "total_absent": absent
    }


# Dashboard summary (BONUS)
def dashboard_summary(db: Session):

    today = date.today()

    total_employees = db.query(func.count(models.Employee.id)).scalar()

    present_today = db.query(func.count(models.Attendance.id)).filter(
        models.Attendance.date == today,
        models.Attendance.status == "present"
    ).scalar()

    absent_today = db.query(func.count(models.Attendance.id)).filter(
        models.Attendance.date == today,
        models.Attendance.status == "absent"
    ).scalar()

    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today
    }