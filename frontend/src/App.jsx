import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import "./App.css";

export default function App() {

  const [page,setPage]=useState("dashboard");

  return (

    <div className="layout">

      <div className="sidebar">

        <h2>HRMS Lite</h2>

        <button onClick={()=>setPage("dashboard")}>
          Dashboard
        </button>

        <button onClick={()=>setPage("employees")}>
          Employees
        </button>

        <button onClick={()=>setPage("attendance")}>
          Attendance
        </button>

      </div>

      <div className="content">

        {page==="dashboard" && <Dashboard/>}
        {page==="employees" && <Employees/>}
        {page==="attendance" && <Attendance/>}

      </div>

    </div>

  );

}