'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <div  className='nav-container'>
        <div className="nav-upper">
          <p>Hello world</p>
          <MdCloseFullscreen/>
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
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="nav-crossline"></div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="navlink-container">
          <ul>
            <li>Dashboard</li>
            <li><MdDashboard/></li>
          </ul>
        </div>
        <div className="nav-account">
          
        </div>
    </div>
  )
}
