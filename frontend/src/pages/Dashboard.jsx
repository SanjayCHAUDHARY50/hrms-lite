import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Dashboard(){

  const [data,setData]=useState(null);

  useEffect(()=>{
    load();
  },[]);

  const load = async()=>{
    const res = await API.get("/dashboard/");
    setData(res.data);
  };

  if(!data) return <p>Loading...</p>;

  return(

    <div>

      <h2>Dashboard</h2>

      <div className="card-container">

        <div className="card">
          <h3>Total Employees</h3>
          <h1>{data.total_employees}</h1>
        </div>

        <div className="card">
          <h3>Present Today</h3>
          <h1>{data.present_today}</h1>
        </div>

        <div className="card">
          <h3>Absent Today</h3>
          <h1>{data.absent_today}</h1>
        </div>

      </div>

    </div>

  );
}