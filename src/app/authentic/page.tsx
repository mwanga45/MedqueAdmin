"use client";
import React from "react";
import Register from "../components/registerForm";
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
          <div
            style={{
              color: "silver",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              Let us make our country health service better and make our time
              more worth with Mequeue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
