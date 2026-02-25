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

    alert("Attendance marked");

  };

  const load = async()=>{

    const res = await API.get(`/attendance/${empId}`);

    setRecords(res.data);

  };

  return(

    <div>

      <h2>Attendance</h2>

      <input
        placeholder="Employee DB ID"
        onChange={e=>setEmpId(e.target.value)}
      />

      <input
        type="date"
        onChange={e=>setDate(e.target.value)}
      />

      <button className="button" onClick={mark}>
        Mark Present
      </button>

      <button className="button" onClick={load}>
        Load
      </button>

      <table className="table">

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