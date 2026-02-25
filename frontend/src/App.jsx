import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://hrms-backend-5ad7.onrender.com";

function App() {

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/employees/`);
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async () => {
    try {
      await axios.post(`${API}/employees/`, form);
      fetchEmployees();
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
      });
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div style={{padding:"20px", fontFamily:"Arial"}}>

      <h1>HRMS Lite Admin Panel</h1>

      <h2>Add Employee</h2>

      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e)=>setForm({...form, employee_id:e.target.value})}
      />

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e)=>setForm({...form, full_name:e.target.value})}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e)=>setForm({...form, email:e.target.value})}
      />

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e)=>setForm({...form, department:e.target.value})}
      />

      <button onClick={createEmployee}>
        Add
      </button>

      <h2>Employees</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {employees.length === 0 && <p>No employees found</p>}

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.full_name} ({emp.department})
            <button onClick={()=>deleteEmployee(emp.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;