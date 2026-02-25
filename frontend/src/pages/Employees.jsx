import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Employees(){

  const [employees,setEmployees]=useState([]);

  const [form,setForm]=useState({
    employee_id:"",
    full_name:"",
    email:"",
    department:""
  });

  const [summary,setSummary]=useState(null);

  useEffect(()=>{
    load();
  },[]);

  const load = async()=>{
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  const add = async()=>{

    await API.post("/employees/",form);

    setForm({
      employee_id:"",
      full_name:"",
      email:"",
      department:""
    });

    load();
  };

  const remove = async(id)=>{
    await API.delete(`/employees/${id}`);
    load();
  };

  const getSummary = async(id)=>{
    const res = await API.get(`/dashboard/employee/${id}`);
    setSummary(res.data);
  };

  return(

    <div>

      <h2>Add Employee</h2>

      <input placeholder="Employee ID"
        value={form.employee_id}
        onChange={e=>setForm({...form,employee_id:e.target.value})}
      />

      <input placeholder="Name"
        value={form.full_name}
        onChange={e=>setForm({...form,full_name:e.target.value})}
      />

      <input placeholder="Email"
        value={form.email}
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input placeholder="Department"
        value={form.department}
        onChange={e=>setForm({...form,department:e.target.value})}
      />

      <button onClick={add}>Add</button>


      <h2>Employee List</h2>

      <table border="1" cellPadding="5">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {employees.map(e=>(

            <tr key={e.id}>

              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.department}</td>

              <td>

                <button onClick={()=>remove(e.id)}>
                  Delete
                </button>

                <button onClick={()=>getSummary(e.id)}>
                  Summary
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {summary && (

        <div>

          <h3>Summary</h3>

          Present: {summary.total_present}

          <br/>

          Absent: {summary.total_absent}

        </div>

      )}

    </div>

  );
}