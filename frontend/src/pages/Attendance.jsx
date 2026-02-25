import { useState } from "react";
import { API } from "../api/api";

export default function Attendance(){

  const [empId,setEmpId]=useState("");

  const [date,setDate]=useState("");

  const [records,setRecords]=useState([]);

  const mark = async()=>{

    await API.post("/attendance/",{

      employee_db_id:Number(empId),

      date:date,

      status:"present"

    });

    alert("Marked");

  };

  const loadEmployee = async()=>{

    const res = await API.get(`/attendance/${empId}`);

    setRecords(res.data);

  };

  const loadDate = async()=>{

    const res = await API.get(`/attendance/?attendance_date=${date}`);

    setRecords(res.data);

  };

  return(

    <div>

      <h2>Attendance</h2>

      Employee ID:

      <input
        onChange={e=>setEmpId(e.target.value)}
      />

      Date:

      <input
        type="date"
        onChange={e=>setDate(e.target.value)}
      />

      <br/><br/>

      <button onClick={mark}>
        Mark Present
      </button>

      <button onClick={loadEmployee}>
        View Employee Attendance
      </button>

      <button onClick={loadDate}>
        Filter by Date
      </button>


      <h3>Records</h3>

      <table border="1">

        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {records.map(r=>(

            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}