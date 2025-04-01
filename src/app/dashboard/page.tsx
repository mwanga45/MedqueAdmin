"use client";
import React from "react";
import "./dashboard.css";
import Sidebar from "../components/sidebar";
export default function Dashboard() {
    const handlesidebar = ()=>{
    }
  return (
    <div className="dash-container">
      <div className="dash-sidebar">
        <Sidebar/>
      </div>
      <div className="dash-upperboard">
        hELLO
      </div>
      <div className="dash-maincontainer">
        NOPE
      </div>
    </div>
  );
}
