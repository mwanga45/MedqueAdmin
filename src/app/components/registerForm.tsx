"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoLogInSharp } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { apiurl } from "../Apiurl";


interface Staff {
    username: string;
    regNo: string;
    email: string;
    phone: string;
    password: string;
    confirmpwrd: string;
    specialist: string
}
interface Specialist {
    specialist: string;
    Description: string
}
interface changeToLogin {
    changeToLogin: () => void
}


export default function Register({ changeToLogin, }: changeToLogin) {
    const router = useRouter()
    const [CloseForm, setCloseForm] = useState<boolean>(false)
    const handleToLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        changeToLogin()
    }
    const [specInfo, setspecInfo] = useState<Specialist[]>([{
        specialist: "",
        Description: ""
    }])
    const [formData, setFormData] = useState<Staff>(
        {
            username: "",
            regNo: "",
            password: "",
            confirmpwrd: "",
            email: "",
            specialist: "",
            phone: "",

        }
    )
    const handleonchangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        router.push("./dashboard")
    }
    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(apiurl+"dkt/register", formData)
            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message)
            setFormData({
                username: "",
                email: "",
                password: "",
                confirmpwrd: "",
                regNo: "",
                phone: "",
                specialist: ""
            })
        } catch (err) {
            console.error(err)
            toast.error("something went wrong")
        }
    }
    const handlefetch = async () => {
        try {
            const res = await axios.get(apiurl + "adim/getspecInfo")
            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }
            setspecInfo(res.data.data)
            alert("Press button login  login")
        } catch (err) {
            console.error("Something went wrong")
            toast.error("Internal serverError  status:500")
            return
        }
    }
    useEffect(() => {
        handlefetch()
    }, [])
    return (
        <div className="reg-container">
            <ToastContainer />
            <div className="regTitle">
                <p>Register An Account Here! </p>
            </div>
            <form onSubmit={handlesubmit}>
                <div className="reg-inputConatiner">
                    <label htmlFor="name-input">Username</label>
                    <input type="text" name="username" id="name-input" placeholder="Enter Name eg Husna Ezy" value={formData.username} onChange={handleonchangeEvent} />
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="Email-input">Email</label>
                    <input type="email" id="Email-input" placeholder="Enter your Email please" name="email" value={formData.email} onChange={handleonchangeEvent} />
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="RegNumber-input">Registration Number</label>
                    <input type="text" name="regNo" id="RegNumber" placeholder="Enter your Registration number please" value={formData.regNo} onChange={handleonchangeEvent} />
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="category">Specialist</label>
                    <select
                        id="category"
                        name="specialist"
                        value={formData.specialist}
                        onChange={handleonchangeEvent}
                        required
                        style={{
                            outline: 'none',
                            backgroundColor: '#edffff',
                            borderRadius: '5px',
                            height: '5svh',
                            width: '35svh',
                            paddingLeft: '5px',
                            boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                            border: 'none',
                            fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Select specialist</option>
                        {specInfo.map((s) => (
                            <option key={s.specialist} value={s.specialist}>
                                {s.specialist}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="RegNumber-input">Password</label>
                    <input type="password" name="password" id="RegNumber" placeholder="Enter your Password please" value={formData.password} onChange={handleonchangeEvent} />
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="cnpwrd">Confirm Password</label>
                    <input type="password" name="confirmpwrd" id="cnpwrd" placeholder="Re type your password to confirm" value={formData.confirmpwrd} onChange={handleonchangeEvent} />
                </div>
                <div className="reg-inputConatiner">
                    <label htmlFor="dial">Phone</label>
                    <input type="text" id="dial" placeholder="Enter your Email please" name="phone" value={formData.phone} onChange={handleonchangeEvent} />
                </div>
                <div className="regbtn-container">
                    <button type="submit" name="Submit" className="reg-btn">Register</button>
                </div>
                <div className="cross-line">
                </div>
            </form>
                <button className=" jump-to" name="jump" onClick={handleToLogin} >Already register <IoLogInSharp /></button>
        </div>
    );
}
