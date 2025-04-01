"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogInSharp } from "react-icons/io5";
export default interface Staff {
  name: string;
  registration: number;
  email: string;
  phone: number;
  home_address: string;
}
interface changeToLogin {
    changeToLogin: ()=> void
    // todashboard:()=> void
}

export default function Register({changeToLogin,}:changeToLogin) {
    const router = useRouter()
    const [CloseForm, setCloseForm] = useState<boolean>(false)
    const handleToLogin = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()  
        changeToLogin()
    }
    const handleRegister = (event:React.MouseEvent<HTMLButtonElement>)=>{
      event.preventDefault()
    }
    const handleLoginBtn = (event:React.MouseEvent<HTMLButtonElement>)=>{
        router.push("./dashboard")
      }
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
            <button type="submit" name="Submit" className="reg-btn" onClick={handleLoginBtn}>Register</button>
        </div>
        <div className="cross-line">
        </div>
        <button className=" jump-to" name="jump"onClick={handleToLogin} >Already register <IoLogInSharp/></button>
    </form>
</div>
);
}
