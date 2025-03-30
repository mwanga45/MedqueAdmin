"use client"
import React from "react";
export default interface Staff {
  name: string;
  registration: number;
  email: string;
  phone: number;
  home_address: string;
}
export default function Register() {
  return (
    <div className="reg-container">
    <form>
        <div>
            <label htmlFor="name-input"></label>
            <input type="text" name="name" id="name-input" placeholder="Enter your name please"/>
        </div>
        <div>
            <label htmlFor="Email-input"></label>
            <input type="email" id="Email-input" placeholder="Enter your name please"/>
        </div>
        <div>
            <label htmlFor="RegNumber-input"></label>
            <input type="text" name="RegNumber" id="RegNumber" placeholder="Enter your name please"/>
        </div>
        <div>
            <label htmlFor="RegNumber-input"></label>
            <input type="password" name="user-password" id="RegNumber" placeholder="Enter your name please"/>
        </div>
        <div>
            <label htmlFor="RegNumber-input"></label>
            <input type="password" name="password-confirm" id="RegNumber" placeholder="Enter your name please"/>
        </div>
    </form>
</div>
);
}
