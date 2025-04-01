"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogOutSharp } from "react-icons/io5";
interface LoginProps{
    changeToRegister: ()=> void
}
export default function Login({changeToRegister}:LoginProps) {
    const router = useRouter()
    const [ischanged, setischanged] = useState<boolean>(false)
    const handleToRegister = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        changeToRegister()
    }
    const handleLogin = (event:React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault()
      router.push("/dashboard")
    }
  return (
    <div className="log-container">
      <div className="logTitle">
        <p>Sign Here!</p>
      </div>
      <form>
        <div className="log-inputConatiner">
          <label htmlFor="name-input">Username</label>
          <input
            type="text"
            name="name"
            id="name-input"
            placeholder="Enter your name please"
          />
        </div>
        <div className="log-inputConatiner">
          <label htmlFor="RegNumber-input">Registration Number</label>
          <input
            type="text"
            name="RegNumber"
            id="RegNumber"
            placeholder="Enter your name please"
          />
        </div>
        <div className="log-inputConatiner">
          <label htmlFor="RegNumber-input">Password</label>
          <input
            type="password"
            name="user-password"
            id="RegNumber"
            placeholder="Enter your name please"
          />
        </div>
        <div className="logbtn-container">
          <button type="submit" name="login" className="log-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="cross-line"></div>
        <button className="jump-to" onClick={handleToRegister}>
            Register here <IoLogOutSharp/>
        </button>
      </form>
    </div>
  );
}
