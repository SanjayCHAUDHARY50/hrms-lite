import { useEffect, useState } from "react";
import { API } from "../api/api";
import "../App.css";

export default function Attendance() {

  const [employees, setEmployees] = useState([]);

  /* MARK STATE */
  const [markManualId, setMarkManualId] = useState("");
  const [markSelectId, setMarkSelectId] = useState("");
  const [markDate, setMarkDate] = useState("");
  const [markStatus, setMarkStatus] = useState("present");

  /* SEARCH STATE */
  const [searchManualId, setSearchManualId] = useState("");
  const [searchSelectId, setSearchSelectId] = useState("");
  const [searchDate, setSearchDate] = useState("");

  /* TABLE DATA */
  const [records, setRecords] = useState([]);


  /* LOAD EMPLOYEES */
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch {
      alert("Failed to load employees");
    }
  };


  /* HELPERS */

  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === Number(id));
    return emp ? emp.full_name : "";
  };


  const getMarkEmployeeId = () => {
    return markManualId || markSelectId;
  };


  const getSearchEmployeeId = () => {
    return searchManualId || searchSelectId;
  };


  /* MARK ATTENDANCE */

  const markAttendance = async () => {

    const empId = getMarkEmployeeId();

    if (!empId || !markDate) {
      alert("Please select employee and date");
      return;
    }

    try {

      await API.post("/attendance/", {
        employee_db_id: Number(empId),
        date: markDate,
        status: markStatus
      });

      alert("Attendance saved");

    } catch (err) {

      alert(err.response?.data?.detail || "Error");

    }
  };


  /* SEARCH ATTENDANCE */

  const searchAttendance = async () => {

    const empId = getSearchEmployeeId();

    /* employee + date */
    if (empId && searchDate) {

      const res = await API.get(`/attendance/${empId}`);

      const filtered = res.data
        .filter(r => r.date === searchDate)
        .map(r => ({
          empId,
          name: getEmployeeName(empId),
          date: r.date,
          status: r.status
        }));

      setRecords(filtered);
      return;
    }


    /* employee only */
    if (empId) {

      const res = await API.get(`/attendance/${empId}`);

      const mapped = res.data.map(r => ({
        empId,
        name: getEmployeeName(empId),
        date: r.date,
        status: r.status
      }));

      setRecords(mapped);
      return;
    }


    /* date only */
    if (searchDate) {

      const res = await API.get(
        `/attendance/?attendance_date=${searchDate}`
      );

      const mapped = res.data.map(r => ({
        empId: r.employee_db_id,
        name: getEmployeeName(r.employee_db_id),
        date: r.date,
        status: r.status
      }));

      setRecords(mapped);
      return;
    }


    alert("Select employee or date");

  };


  return (

    <div>

      <h2>Attendance Management</h2>


      {/* TOP GRID */}

      <div className="attendance-top">


        {/* MARK CARD */}

        <div className="card">

          <h3>Mark Attendance</h3>

          <div className="form-row">

            <div className="form-group">

              <label>Manual Employee ID</label>

              <input
                placeholder="Enter ID"
                value={markManualId}
                onChange={(e) =>
                  setMarkManualId(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Select Employee</label>

              <select
                value={markSelectId}
                onChange={(e) =>
                  setMarkSelectId(e.target.value)
                }
              >

                <option value="">Select</option>

                {employees.map(emp => (

                  <option key={emp.id} value={emp.id}>

                    {emp.employee_id} — {emp.full_name}

                  </option>

                ))}

              </select>

            </div>


            <div className="form-group">

              <label>Date</label>

              <input
                type="date"
                value={markDate}
                onChange={(e) =>
                  setMarkDate(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Status</label>

              <select
                value={markStatus}
                onChange={(e) =>
                  setMarkStatus(e.target.value)
                }
              >

                <option value="present">
                  Present
                </option>

                <option value="absent">
                  Absent
                </option>

              </select>

            </div>


            <div className="form-group">

              <button
                className="button"
                onClick={markAttendance}
              >
                Save
              </button>

            </div>

          </div>

        </div>



        {/* SEARCH CARD */}

        <div className="card">

          <h3>Search Attendance</h3>

          <div className="form-row">


            <div className="form-group">

              <label>Manual Employee ID</label>

              <input
                placeholder="Enter ID"
                value={searchManualId}
                onChange={(e) =>
                  setSearchManualId(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Select Employee</label>

              <select
                value={searchSelectId}
                onChange={(e) =>
                  setSearchSelectId(e.target.value)
                }
              >

                <option value="">Select</option>

                {employees.map(emp => (

                  <option key={emp.id} value={emp.id}>

                    {emp.employee_id} — {emp.full_name}

                  </option>

                ))}

              </select>

            </div>


            <div className="form-group">

              <label>Date</label>

              <input
                type="date"
                value={searchDate}
                onChange={(e) =>
                  setSearchDate(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <button
                className="button"
                onClick={searchAttendance}
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </div>



      {/* TABLE */}

      <div className="card">

        <h3>Attendance Records</h3>

        <table className="table">

          <thead>

            <tr>

              <th>Employee ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {records.length === 0 && (

              <tr>
                <td colSpan="4">
                  No records found
                </td>
              </tr>

            )}


            {records.map((r, index) => (

              <tr key={index}>

                <td>{r.empId}</td>

                <td>{r.name}</td>

                <td>{r.date}</td>

                <td className={
                  r.status === "present"
                    ? "status-present"
                    : "status-absent"
                }>
                  {r.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


    </div>

  );

}