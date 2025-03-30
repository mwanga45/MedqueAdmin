"use client"
import React from "react";

export default function Login (){
    return(
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
    )
}