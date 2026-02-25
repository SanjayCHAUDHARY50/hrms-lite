import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

export default function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ fontFamily: "Arial" }}>

      <div style={{
        background:"#1e293b",
        color:"white",
        padding:"15px"
      }}>
        <h2>HRMS Lite Admin</h2>
      </div>

      <div style={{ display:"flex" }}>

        <div style={{
          width:"200px",
          background:"#f1f5f9",
          padding:"10px",
          minHeight:"100vh"
        }}>

          <button onClick={()=>setPage("dashboard")}>
            Dashboard
          </button>

          <br/><br/>

          <button onClick={()=>setPage("employees")}>
            Employees
          </button>

          <br/><br/>

          <button onClick={()=>setPage("attendance")}>
            Attendance
          </button>

        </div>

        <div style={{ padding:"20px", flex:1 }}>

          {page==="dashboard" && <Dashboard/>}
          {page==="employees" && <Employees/>}
          {page==="attendance" && <Attendance/>}

        </div>

      </div>

    </div>
  );
}