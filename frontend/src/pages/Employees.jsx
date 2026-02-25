import { useEffect,useState } from "react";
import { API } from "../api/api";

export default function Employees(){

  const [employees,setEmployees]=useState([]);

  const [form,setForm]=useState({
    employee_id:"",
    full_name:"",
    email:"",
    department:""
  });

  useEffect(()=>{
    load();
  },[]);

  const load = async()=>{
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  const add = async()=>{
    await API.post("/employees/",form);
    load();
  };

  const remove = async(id)=>{
    await API.delete(`/employees/${id}`);
    load();
  };

  return(

    <div>

      <h2>Employees</h2>

      <div className="form">

        <input placeholder="ID"
          onChange={e=>setForm({...form,employee_id:e.target.value})}
        />

        <input placeholder="Name"
          onChange={e=>setForm({...form,full_name:e.target.value})}
        />

        <input placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}
        />

        <input placeholder="Department"
          onChange={e=>setForm({...form,department:e.target.value})}
        />

        <button className="button" onClick={add}>
          Add
        </button>

      </div>

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {employees.map(e=>(

            <tr key={e.id}>

              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>

              <td>
                <button
                  className="button delete"
                  onClick={()=>remove(e.id)}
                >
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}