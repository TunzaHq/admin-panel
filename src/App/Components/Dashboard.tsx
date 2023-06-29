import React from "react";
import "../Style/dashboard.css";
import { makeGetRequest } from "../Api/ApiHandler";
import { IUser } from "../interfaces/user.interface";

const Dashboard: React.FC = () => {
  const userObj= sessionStorage.getItem("user");
  console.log(userObj);  
  

  return (
    <div>
      <h1 style={{ fontWeight: 900 }}>Dashboard</h1>
      <p style={{ fontWeight: 700, color: "var(--gray)" }}>Welcome Paul</p>

      <div className="d-flex">
        <img src="/assets/svg/calendar.svg" alt="calendar icon" />
        <p className="my-auto mx-3">Pick Date Range</p>
      </div>
    </div>
  );
};

export default Dashboard;
