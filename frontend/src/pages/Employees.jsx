import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id:"",
    full_name:"",
    email:"",
    department:""
  });

  const load = async () => {
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(()=>{
    load();
  },[]);

  const add = async () => {
    await API.post("/employees/", form);
    load();
  };

  const remove = async (id) => {
    await API.delete(`/employees/${id}`);
    load();
  };

  return (
    <div>

      <h2>Employees</h2>

      <input placeholder="ID"
        onChange={e=>setForm({...form, employee_id:e.target.value})}
      />

      <input placeholder="Name"
        onChange={e=>setForm({...form, full_name:e.target.value})}
      />

      <input placeholder="Email"
        onChange={e=>setForm({...form, email:e.target.value})}
      />

      <input placeholder="Department"
        onChange={e=>setForm({...form, department:e.target.value})}
      />

      <button onClick={add}>Add</button>

      {employees.length === 0 && <p>No employees found</p>}

      <ul>

        {employees.map(e=>(
          <li key={e.id}>

            {e.full_name} — {e.department}

            <button onClick={()=>remove(e.id)}>
              Delete
            </button>

          </li>
        ))}

      </ul>

    </div>
  );
}