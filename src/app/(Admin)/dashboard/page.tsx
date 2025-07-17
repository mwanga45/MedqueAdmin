"use client";
import React, { useState } from "react";
import MainTb from "../../components/animate-table";
import AnimatedTable from "../../components/table";
import "./dashboard.css";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import { BiHealth } from "react-icons/bi";
import ServicePopup from "../../components/serviceRegpopup"
import { MdOutlineAnalytics } from "react-icons/md";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [isstaffOpen, setisstaffopen] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const handleisopen = () => {
    setisstaffopen(!isstaffOpen)
  }
  const handleOpenAnalytics = () => setShowAnalytics(true)
  const handleCloseAnalytics = () => setShowAnalytics(false)

  // Demo data for each service
  const services = [
    {
      name: 'General Checkup',
      predicted: [20, 22, 18, 25, 24, 19, 21],
      actual: [18, 20, 17, 23, 22, 18, 20],
    },
    {
      name: 'Dental',
      predicted: [12, 14, 13, 15, 16, 12, 13],
      actual: [11, 13, 12, 14, 15, 11, 12],
    },
    {
      name: 'Pediatrics',
      predicted: [10, 9, 11, 12, 10, 8, 9],
      actual: [9, 8, 10, 11, 9, 7, 8],
    },
    {
      name: 'Cardiology',
      predicted: [7, 6, 8, 9, 7, 6, 7],
      actual: [6, 5, 7, 8, 6, 5, 6],
    },
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="dash-container">
      
      <div className="dash-main-content">
        <div className="dash-upperboard">
          <div className="unv-title">
            <BiHealth size={50} color="green" />
            <p style={{ color: "green", fontSize: 30, fontWeight: 900 }}>
              Medqueue Admin-Site
            </p>
          </div>
          <div className="upper-innercontainer">
            <p className="page-title">Dashboard</p>
            <button className="analytics-btn" onClick={handleOpenAnalytics}>
              <MdOutlineAnalytics size={22} style={{ marginRight: 8 }} /> Analytics / Prediction
            </button>
          </div>
          {/* Summary Cards Row */}
          <div className="dashboard-summary-row">
            <div className="dashboard-summary-card total">
              <div className="summary-title">Total Bookings</div>
              <div className="summary-value">123</div>
            </div>
            <div className="dashboard-summary-card pending">
              <div className="summary-title">Pending</div>
              <div className="summary-value">12</div>
            </div>
            <div className="dashboard-summary-card confirmed">
              <div className="summary-title">Confirmed</div>
              <div className="summary-value">89</div>
            </div>
            <div className="dashboard-summary-card completed">
              <div className="summary-title">Completed</div>
              <div className="summary-value">22</div>
            </div>
          </div>
          <div className="optional-dashcontainer">
            <button className="optional-dash" onClick={handleisopen}>
              <p>Register</p>
            </button>
            <div className="optional-dash">
              <p>Nurse</p>
            </div>
            <div className="optional-dash">
              <p>Doctor</p>
            </div>
          </div>
          <div className="Upper-searchbar">
            <input type="text" name="search" placeholder="search" />
            <FaSearch size={20} color="black" />
          </div>
        </div>
        <div className="dash-maincontainer">
          {isstaffOpen ? <ServicePopup /> : <AnimatedTable />}
        </div>
        {/* Analytics/Prediction Modal */}
        {showAnalytics && (
          <div className="analytics-modal-overlay" onClick={handleCloseAnalytics}>
            <div className="analytics-modal-slide" onClick={e => e.stopPropagation()}>
              <button className="analytics-modal-close" onClick={handleCloseAnalytics}>&times;</button>
              <h2>Analytics / Prediction</h2>
              <div style={{marginTop: 24, color: '#555'}}>
                {services.map((service, idx) => (
                  <div key={service.name} className="analytics-graph-card">
                    <div className="analytics-graph-title">{service.name}</div>
                    <Line
                      data={{
                        labels: days,
                        datasets: [
                          {
                            label: 'Predicted',
                            data: service.predicted,
                            borderColor: '#4f8cff',
                            backgroundColor: 'rgba(79,140,255,0.1)',
                            tension: 0.4,
                          },
                          {
                            label: 'Actual',
                            data: service.actual,
                            borderColor: '#2ecc71',
                            backgroundColor: 'rgba(46,204,113,0.1)',
                            tension: 0.4,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'top' as const },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true, ticks: { stepSize: 5 } },
                        },
                      }}
                      height={180}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
