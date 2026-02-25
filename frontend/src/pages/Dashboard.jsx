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

      <div style={{display:"flex",gap:"20px"}}>

        <Card title="Total Employees" value={data.total_employees}/>
        <Card title="Present Today" value={data.present_today}/>
        <Card title="Absent Today" value={data.absent_today}/>

      </div>

    </div>

  );
}

function Card({title,value}){

  return(
    <div style={{
      padding:"20px",
      background:"#e2e8f0",
      width:"200px"
    }}>
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );

}