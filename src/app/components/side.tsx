import React, { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";
import { GrSchedules } from "react-icons/gr";
import { MdOutlineAnalytics } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import './side.css';

const navItems = [
  { label: "Dashboard", icon: <MdDashboard />, route: "/dashboard" },
  { label: "Staff Registration", icon: <FaUserEdit />, route: null },
  { label: "Scheduling", icon: <FaCodeMerge />, route: "/sheduling" },
  { label: "Service Registration", icon: <GrSchedules />, route: "/service-registration" },
  { label: "Prediction", icon: <MdOutlineAnalytics />, route: "/prediction" },
  { label: "Sign-Out", icon: <SiMinutemailer />, route:"/authentic" },
  { label: "Setting", icon: <IoSettingsOutline />, route: null },
  
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setEmail(decoded.email || decoded.Email || "");
        } catch (err) {
          setEmail("");
        }
      }
    }
  }, []);

  return (
    <div className='side-nav-container'>
      <div className="side-nav-upper">
        <p className="side-nav-title">Main Menu</p>
      </div>
      <div className="side-nav-links">
        {navItems.map((item) => {
          const isActive = item.route && pathname === item.route;
          return (
            <div
              key={item.label}
              className={`side-navlink${isActive ? " side-navlink-active" : ""}${!item.route ? " side-navlink-disabled" : ""}`}
              onClick={() => { if (item.route) router.push(item.route); }}
              tabIndex={item.route ? 0 : -1}
              aria-current={isActive ? "page" : undefined}
              role="button"
              style={{ pointerEvents: item.route ? "auto" : "none", opacity: item.route ? 1 : 0.5 }}
              onKeyDown={e => { if (item.route && (e.key === "Enter" || e.key === " ")) router.push(item.route); }}
            >
              <span className="side-nav-icon">{item.icon}</span>
              <span className="side-nav-label">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="side-nav-account">
        <div className="side-nav-imagecontainer">
          <img src="/next.svg" alt="Next.js Logo" />
        </div>
        <div className="side-nav-AccountName">
          <p>{email ? email : "No email found"}</p>
        </div>
      </div>
    </div>
  );
} 