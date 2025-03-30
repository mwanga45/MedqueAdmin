"use client";
import React from "react";
import Register from "../components/login";
import { BiHealth } from "react-icons/bi";
import { FaHospitalSymbol } from "react-icons/fa";
import { GiBigWave } from "react-icons/gi";
import "./authentic.css";
export default function Authentic() {
  return (
    <div className="authentic-container">
      <div className="left-Acontainer">
        <div className="left-svg">
          <FaHospitalSymbol />
          <GiBigWave />
        </div>
        <div className="form-register">
          <Register />
        </div>
      </div>
      <div className="right-Acontainer">
        <div className="right-content">
          <BiHealth />
          <p className="right-title">Welcome To Medqueue</p>
          <p>let change our life with it </p>
        </div>
      </div>
    </div>
  );
}
