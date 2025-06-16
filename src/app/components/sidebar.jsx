'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import { IoNotifications } from "react-icons/io5";
import { FaCodeMerge } from "react-icons/fa6";
import { GrSchedules } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import ServicePopup from "../components/serviceRegpopup"

export default function Sidebar() {

  return (
    <div  className='nav-container'>
        <div className="nav-upper">
          <p style={{color:"whitesmoke", fontSize:"20px", fontWeight:"800", fontFamily:"revert-layer"}}>Main Menu</p>
          <MdCloseFullscreen size={30}/>
        </div>
        <div className="nav-searchbar">
          <input type='text' name='search' placeholder='search'/>
          <FaSearch/>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="navlink-container" >
          <button onClick={()=><ServicePopup/> }>
          <ul>
            <li>Staff Registration</li>
            <li><FaUserEdit /></li>
          </ul>
          </button>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Emergence</li>
            <li>< FaCodeMerge/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Sheduling</li>
            <li><GrSchedules/></li>
          </ul>
        </div>
        <div className="nav-crossline"></div>
        <div className="navlink-container">
          <ul>
            <li>Notification</li>
            <li><IoNotifications/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>User-Recommendation</li>
            <li><SiMinutemailer/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Setting</li>
            <li><IoSettingsOutline /></li>
          </ul>
        </div>
        <div className="nav-account">
           <div className="nav-imagecontainer">
           <img src="/next.svg" alt="Next.js Logo" />
           </div>
           <div className="nav-AccountName">
            <p>@lynx Prazoo</p>
           </div>
        </div>
    </div>
  )
}
