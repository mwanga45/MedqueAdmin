"use client"
import { useState, useEffect } from "react"
import "./dock.css"
import axios from "axios";
import { apiurl } from"../../Apiurl"

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [doctorProfile, setDoctorProfile] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  // Get authorization token (assuming it's stored in localStorage)
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Axios instance with base configuration
  const api = axios.create({
    baseURL: apiurl+"/dkt",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`
    }
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/api/doctor/appointments/today")
        setAppointments(response.data?.data || [])
      } catch (err) {
        setError("Failed to fetch appointments")
        console.error(err)
      }
    }

    const fetchDoctorProfile = async () => {
      try {
        const response = await api.get("/api/doctor/profile")
        setDoctorProfile(response.data?.data || null)
      } catch (err) {
        console.error("Failed to fetch doctor profile", err)
      }
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAppointments(), fetchDoctorProfile()])
      } catch (err) {
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleConfirmBooking = async (id) => {
    try {
      await api.put("/api/doctor/appointments/status", {
        appointment_id: id,
        status: "confirmed"
      });
      
      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, status: "confirmed" } : apt
      ));
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      alert("Failed to update appointment status. Please try again.");
    }
  }

  const handlePatientSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setShowSearchResults(false);
      return;
    }
    
    try {
      const response = await api.get(`/api/doctor/patients/search?q=${query}`)
      setSearchResults(response.data?.data || [])
      setShowSearchResults(true)
    } catch (err) {
      console.error("Patient search failed:", err)
    }
  }

  // Calculate metrics
  const expectedToday = appointments.length
  const cameToday = appointments.filter(apt => apt.status === "confirmed").length
  const pendingConfirmation = appointments.filter(apt => apt.status === "pending").length

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase() || ""
  }

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(apt => 
    apt.username?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Doctor Dashboard</h1>
            <p className="header-date">{getCurrentDate()}</p>
          </div>

          <div className="header-actions">
            {/* Search Input with Results */}
            <div className="search-container">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => handlePatientSearch(e.target.value)}
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  {searchResults.map(patient => (
                    <div key={patient.user_id} className="search-result-item">
                      <div className="patient-avatar">
                        {getInitials(patient.fullname)}
                      </div>
                      <div>
                        <p className="patient-name">{patient.fullname}</p>
                        <p className="patient-phone">{patient.dial}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button className="btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* User Dropdown */}
            <div className="dropdown">
              <button onClick={() => setShowDropdown(!showDropdown)} className="avatar">
                {doctorProfile?.doctorname ? getInitials(doctorProfile.doctorname) : "DR"}
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{doctorProfile?.doctorname || "Doctor"}</p>
                    <p className="dropdown-email">{doctorProfile?.email || "doctor@example.com"}</p>
                  </div>
                  <div>
                    <button className="dropdown-item">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </button>
                    <button className="dropdown-item" onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Metrics Cards */}
        <div className="metrics-grid">
          {/* Expected Today Card */}
          <div className="metric-card">
            <div className="metric-header">
              <h3 className="metric-title">Expected Today</h3>
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="metric-value">{expectedToday}</div>
            <p className="metric-description">Total appointments scheduled</p>
          </div>

          {/* Confirmed Today Card */}
          <div className="metric-card">
            <div className="metric-header">
              <h3 className="metric-title">Confirmed Today</h3>
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="metric-value confirmed">{cameToday}</div>
            <p className="metric-description">Patients confirmed their visit</p>
          </div>

          {/* Pending Confirmation Card */}
          <div className="metric-card">
            <div className="metric-header">
              <h3 className="metric-title">Pending Confirmation</h3>
              <svg className="metric-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="metric-value pending">{pendingConfirmation}</div>
            <p className="metric-description">Awaiting confirmation</p>
          </div>
        </div>

        {/* Patient List */}
        <div className="patient-card">
          <div className="patient-header">
            <div className="patient-title-container">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <h2 className="patient-title">Today's Appointments</h2>
            </div>
            <p className="patient-description">List of all patients scheduled for today</p>
          </div>

          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Patient</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <div className="patient-info">
                        <div className="patient-avatar">
                          {getInitials(appointment.username)}
                        </div>
                        <span className="patient-name">{appointment.username}</span>
                      </div>
                    </td>
                    <td>{appointment.startTime}</td>
                    <td>{appointment.endTime}</td>
                    <td>
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td>
                      {appointment.status === "pending" ? (
                        <button 
                          onClick={() => handleConfirmBooking(appointment.id)} 
                          className="btn-primary"
                        >
                          Confirm Booking
                        </button>
                      ) : (
                        <span className="status-confirmed">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Confirmed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}