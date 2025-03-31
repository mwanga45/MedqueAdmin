"use client";
import React from "react";

export default function Login() {
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
          <button type="submit" name="login" className="log-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
