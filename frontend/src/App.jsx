import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function App(){

  const [page,setPage]=useState("dashboard");

  return(

    <div style={{padding:"20px"}}>

      <h1>HRMS Lite Admin</h1>

      <button onClick={()=>setPage("dashboard")}>
        Dashboard
      </button>

      <button onClick={()=>setPage("employees")}>
        Employees
      </button>

      <button onClick={()=>setPage("attendance")}>
        Attendance
      </button>

      <hr/>

      {page==="dashboard" && <Dashboard/>}
      {page==="employees" && <Employees/>}
      {page==="attendance" && <Attendance/>}

    </div>

  );
}

export default App;