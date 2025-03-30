"use-client";
import React from "react";
import "./page.css";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container">
      <div className="go-to">
        <button name="go-to">Get started</button>
        <FaArrowRight/>
      </div>
    </div>
  );
}
