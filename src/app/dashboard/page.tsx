"use client";
import React from "react";
import MainTb from "../components/animate-table";
import AnimatedTable from "../components/table";
import "./dashboard.css";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../components/sidebar";
import { BiHealth } from "react-icons/bi";
export default function Dashboard() {
  const handlesidebar = () => {};
  return (
    <div className="dash-container">
      <div className="dash-sidebar">
        <Sidebar />
      </div>
      <div className="dash-upperboard">
        <div className="unv-title">
          <BiHealth size={50} color="green" />
          <p style={{ color: "green", fontSize: 30, fontWeight: 900 }}>
            Medqueue Admin-Site
          </p>
        </div>
        <div className="upper-innercontainer">
          <p className="page-title">DashBoard</p>
        </div>
        <div className="optional-dashcontainer">
          <div className="optional-dash">
            <p>Booking</p>
          </div>
          <div className="optional-dash">
            <p>Nurse</p>
          </div>
          <div className="optional-dash">
            <p>Doctor</p>
          </div>
        </div>
        <div className="Upper-searchbar">
          <input type="text" name="search" placeholder="search" />
          <FaSearch size={20} color="black" />
        </div>
      </div>
      <div className="dash-maincontainer">
        <AnimatedTable />
      </div>
    </div>
  );
}
