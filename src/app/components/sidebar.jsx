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
import { useRouter, usePathname } from "next/navigation";
import ServicePopup from "../components/serviceRegpopup"


const navItems = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    route: "/dashboard",
  },
  {
    label: "Staff Registration",
    icon: <FaUserEdit />,
    route: null, // No route yet
  },
  {
    label: "Scheduling",
    icon: <FaCodeMerge />,
    route: "/sheduling",
  },
  {
    label: "Service Registration",
    icon: <GrSchedules />,
    route: "/service-registration",
  },
  {
    label: "Notification",
    icon: <IoNotifications />,
    route: null,
  },
  {
    label: "User-Recommendation",
    icon: <SiMinutemailer />,
    route: null,
  },
  {
    label: "Setting",
    icon: <IoSettingsOutline />,
    route: null,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='nav-container'>
      <div className="nav-upper">
        <p style={{ color: "whitesmoke", fontSize: "20px", fontWeight: "800", fontFamily: "revert-layer" }}>Main Menu</p>
        <MdCloseFullscreen size={30} />
      </div>
      <div className="nav-searchbar">
        <input type='text' name='search' placeholder='search' />
        <FaSearch />
      </div>
      {navItems.map((item, idx) => {
        const isActive = item.route && pathname === item.route;
        return (
          <div
            key={item.label}
            className={`navlink-container${isActive ? " navlink-active" : ""}${!item.route ? " navlink-disabled" : ""}`}
            onClick={() => {
              if (item.route) router.push(item.route);
            }}
            tabIndex={item.route ? 0 : -1}
            aria-current={isActive ? "page" : undefined}
            role="button"
            style={{ pointerEvents: item.route ? "auto" : "none", opacity: item.route ? 1 : 0.5 }}
            onKeyDown={e => {
              if (item.route && (e.key === "Enter" || e.key === " ")) router.push(item.route);
            }}
          >
            <ul>
              <li>{item.label}</li>
              <li>{item.icon}</li>
            </ul>
          </div>
        );
      })}
      <div className="nav-crossline"></div>
      <div className="nav-account">
        <div className="nav-imagecontainer">
          <img src="/next.svg" alt="Next.js Logo" />
        </div>
        <div className="nav-AccountName">
          <p>@lynx Prazoo</p>
        </div>
      </div>
    </div>
  );
}