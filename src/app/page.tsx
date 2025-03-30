"use client";
import React from "react";
import "./page.css";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="go-to">
        <Link href="/">
        <button name="go-to">Get started </button >
        </Link>
        <FaArrowRight/>
      </div>
    </div>
  );
}
