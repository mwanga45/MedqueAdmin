"use client";
import React from "react";
import Register from "../components/login";
import { BiHealth } from "react-icons/bi";
import "./authentic.css";
export default function Authentic() {
  return (
    <div className="authentic-container">
      <div className="left-Acontainer">
        <Register />
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
