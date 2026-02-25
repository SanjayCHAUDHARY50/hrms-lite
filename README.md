HRMS - Lite is built with a FastAPI backend and a React frontend, both deployed publicly.

Live Frontend:
https://hrms-lite-ruddy-gamma.vercel.app/

Backend API:
https://hrms-backend-5ad7.onrender.com

Swagger Documentation:
https://hrms-backend-5ad7.onrender.com/docs

GitHub Repository:
https://github.com/SanjayCHAUDHARY50/hrms-lite

Features:
Employee Management:
1. Add new employees with unique employee ID, name, email, and department
2. Delete employees when needed
3. Prevent duplicate employee IDs

Attendance Management:
1. Mark attendance as Present or Absent
2. Supports both manual employee ID input and dropdown selection
3. Attendance can be recorded for any date

Attendance Search and Filtering:
1. Flexible filtering options:
   Employee + Date → shows attendance status for that employee on that date
   Employee only → shows full attendance history of that employee
   Date only → shows attendance of all employees on that date

Dashboard:
1. Provides a quick overview:
   Total number of employees
   Number of employees present today
   Number of employees absent today

Tech Stack: 
1. Backend: FastAPI, SQLAlchemy, PostgreSQL (Render hosted), Uvicorn
2. Frontend: React (Vite), Axios, CSS
3. Deployment: Backend: Render, Frontend: Vercel

Prerequisites:-
1. python(3.10 or newer)
2. nodejs and npm
3. git
   
Running Locally:- 
1. Backend: 
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Swagger will be available at:
http://localhost:8000/docs

2. Frontend: 
cd frontend
npm install
npm run dev

Frontend will run at:
http://localhost:5173
