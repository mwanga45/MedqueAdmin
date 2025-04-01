'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";

export default function Sidebar() {
  return (
    <div>
        <div className="nav-upper">
          <p>Hello world</p>
          <MdCloseFullscreen/>
        </div>
        <div className="nav-searchbar">
          <input type='text' name='search' placeholder='search'/>
          <FaSearch/>
        </div>
    </div>
  )
}
