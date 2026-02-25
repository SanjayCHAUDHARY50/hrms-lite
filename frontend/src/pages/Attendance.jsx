import { useState } from "react";
import { API } from "../api/api";

export default function Attendance(){

  const [employeeId,setEmployeeId]=useState("");
  const [records,setRecords]=useState([]);

  const load = async ()=>{
    const res = await API.get(`/attendance/${employeeId}`);
    setRecords(res.data);
  };

  const mark = async ()=>{

    await API.post("/attendance/",{
      employee_db_id:parseInt(employeeId),
      date:new Date().toISOString().split("T")[0],
      status:"present"
    });

    load();
  };

  return(
    <div>

      <h2>Attendance</h2>

      <input
        placeholder="Employee DB ID"
        onChange={e=>setEmployeeId(e.target.value)}
      />

      <button onClick={load}>
        Load Attendance
      </button>

      <button onClick={mark}>
        Mark Present Today
      </button>

      <ul>

        {records.map(r=>(
          <li key={r.id}>
            {r.date} — {r.status}
          </li>
        ))}

      </ul>

    </div>
  );
}