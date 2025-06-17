"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Register from "../components/registerForm";
import { BiHealth } from "react-icons/bi";
import { FaHospitalSymbol } from "react-icons/fa";
import { GiBigWave } from "react-icons/gi";
import Login from "../components/login";
import "./authentic.css";
export default function Authentic() {
  const router = useRouter()
  const [isOpenForm, setisOpenForm] = useState<boolean>(true)
  const handleChangeForm = () => {
    setisOpenForm(!isOpenForm)
  }
  return (
    <div className="authentic-container">
      <div className="left-Acontainer">
        <div className="form-register">
          {isOpenForm ? (
            <Login changeToRegister={handleChangeForm} />
          ) : (
            <Register changeToLogin={handleChangeForm} />
          )}
        </div>
      </div>
      <div className="right-Acontainer">
        <div className="left-svg">
          <FaHospitalSymbol color="green" />
          <GiBigWave color="white"/>
        </div>
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
            <p style={{ width: "60%" }}>
              Let us make our country health service better and make our time
              more worth with Mequeue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
