import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await API.get("/dashboard/");
    setData(res.data);
  };

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <p>Total Employees: {data.total_employees}</p>

      <p>Present Today: {data.present_today}</p>

      <p>Absent Today: {data.absent_today}</p>

    </div>
  );
}