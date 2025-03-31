"use client"
import React from "react";

export default function Login (){
    return(
        <div className="log-container">
            <div className="logTitle">
                <p>Sign Here!</p>
            </div>
            <form>
                <div>
                    <label htmlFor="name-input">Username</label>
                    <input type="text" name="name" id="name-input" placeholder="Enter your name please"/>
                </div>
                <div>
                    <label htmlFor="Email-input">Email</label>
                    <input type="email" id="Email-input" placeholder="Enter your name please"/>
                </div>
                <div>
                    <label htmlFor="RegNumber-input">Registration Number</label>
                    <input type="text" name="RegNumber" id="RegNumber" placeholder="Enter your name please"/>
                </div>
                <div>
                    <label htmlFor="RegNumber-input">Password</label>
                    <input type="password" name="user-password" id="RegNumber" placeholder="Enter your name please"/>
                </div>
            </form>
        </div>
    )
}