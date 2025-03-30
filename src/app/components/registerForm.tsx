"use client"
import React from "react";
import { IoLogInSharp } from "react-icons/io5";
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
        <div className="regTitle">
            <p>Register An Account Here! </p>
        </div>
    <form>
        <div className="reg-inputConatiner">
            <label htmlFor="name-input">Username</label>
            <input type="text" name="name" id="name-input" placeholder="Enter your name please"/>
        </div>
        <div className="reg-inputConatiner">
            <label htmlFor="Email-input">Email</label>
            <input type="email" id="Email-input" placeholder="Enter your Email please"/>
        </div>
        <div className="reg-inputConatiner">
            <label htmlFor="RegNumber-input">Registration Number</label>
            <input type="text" name="RegNumber" id="RegNumber" placeholder="Enter your Registration number please"/>
        </div>
        <div className="reg-inputConatiner">
            <label htmlFor="RegNumber-input">Password</label>
            <input type="password" name="user-password" id="RegNumber" placeholder="Enter your Password please"/>
        </div>
        <div className="reg-inputConatiner">
            <label htmlFor="RegNumber-input">Confirm Password</label>
            <input type="password" name="password-confirm" id="RegNumber" placeholder="Re type your password to confirm"/>
        </div>
        <div className="regbtn-container">
            <button type="submit" name="Submit" className="reg-btn">Register</button>
        </div>
        <div className="cross-line">
        </div>
        <button className=" jump-to" name="jump">Already register <IoLogInSharp/></button>
    </form>
</div>
);
}
