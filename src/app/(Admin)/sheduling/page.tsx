"use client"

import type React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import "./sheduling.css"

import { apiurl } from "../../Apiurl"


interface Doctor {
  doctor_id: number
  doctorname: string
  email: string
  specialist_name: string
  phone: string
  assgn_status: boolean
}

interface Specialist {
  specialist: string
  description: string
}

interface ScheduleForm {
  doctor_id: string
  day_of_week: string
  start_time: string
  end_time: string
}

interface SpecialistForm {
  specialist: string
  description: string
}

export default function DoctorManagement() {
  const [showDoctorPopup, setShowDoctorPopup] = useState(false)
  const [showSpecialistPopup, setShowSpecialistPopup] = useState(false)
  const [specialists, setspecialists] = useState<Specialist[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)

  const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
    doctor_id: "",
    day_of_week: "",
    start_time: "",
    end_time: "",
  })

  const [specialistForm, setSpecialistForm] = useState<SpecialistForm>({
    specialist: "",
    description: "",
  })

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(apiurl + "admin/docshedule", scheduleForm)
      if (res.data.success === false) {
        toast.error(res.data.message)
        return
      }
      toast.success("Schedule registered successfully!")
      setScheduleForm({
        doctor_id: "",
        day_of_week: "",
        start_time: "",
        end_time: "",
      })
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
      return
    }
  }

  const handlegetdoctInfo = async () => {
    setLoading(true)
    try {
      const res = await axios.get(apiurl + "admin/getDocInfo")
      if (res.data.success) {
        setDoctors(res.data.data)
      } else {
        toast.error(res.data.message || "Failed to load doctor information")
      }
    } catch (err) {
      console.error("Error fetching doctor info:", err)
      toast.error("Internal server error")
    } finally {
      setLoading(false)
    }
  }

  const handlefetchexistspecilist = async () => {
    try {

      const res = await axios.get(apiurl + "admin/getspecInfo")
      if (res.data.success === false) {
        toast.error(res.data.message)
        return
      }
      setspecialists(res.data.data)
    } catch (err) {
      toast.error("Error")
      console.log("Something went wrong ", err)
    }
  }

  const handleSpecialistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(apiurl + "admin/regspecialist", specialistForm)

      if (res.data.success === false) {
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
      setSpecialistForm({
        specialist: "",
        description: "",
      })
      // Refresh specialists list
      handlefetchexistspecilist()
    } catch (err) {
      console.error("something went wrong", err)
      toast.error("Internal Error status Error 500")
    }
  }

  const selectDoctor = (doctorId: number) => {
    setScheduleForm((prev) => ({ ...prev, doctor_id: doctorId.toString() }))
    setShowDoctorPopup(false)
  }

  useEffect(() => {
    handlefetchexistspecilist()
    handlegetdoctInfo() // Load doctor information on component mount
  }, [])

  return (
    <div className="container">
      <ToastContainer />
      <header className="header">
        <h1>Doctor Management System</h1>
      </header>

      <div className="main-content">
 
        <section className="section">
          <h2>Doctor Schedule Registration</h2>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button className="btn btn-primary" onClick={() => setShowDoctorPopup(true)}>
              View All Doctors
            </button>
            <button className="btn btn-secondary" onClick={handlegetdoctInfo} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh Doctors'}
            </button>
          </div>

          <form className="form" onSubmit={handleScheduleSubmit}>
            <div className="form-group">
              <label htmlFor="doctor_id">Doctor ID:</label>
              <input
                type="number"
                id="doctor_id"
                value={scheduleForm.doctor_id}
                onChange={(e) => setScheduleForm((prev) => ({ ...prev, doctor_id: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="day_of_week">Day of Week:</label>
              <select
                id="day_of_week"
                value={scheduleForm.day_of_week}
                onChange={(e) => setScheduleForm((prev) => ({ ...prev, day_of_week: e.target.value }))}
                required
              >
                <option value="">Select Day</option>
                {dayNames.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="start_time">Start Time:</label>
              <input
                type="time"
                id="start_time"
                value={scheduleForm.start_time}
                onChange={(e) => setScheduleForm((prev) => ({ ...prev, start_time: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end_time">End Time:</label>
              <input
                type="time"
                id="end_time"
                value={scheduleForm.end_time}
                onChange={(e) => setScheduleForm((prev) => ({ ...prev, end_time: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Register Schedule
            </button>
          </form>
        </section>

        {/* Specialist Management Section */}
        <section className="section">
          <h2>Specialist Management</h2>

          <button className="btn btn-primary" onClick={() => setShowSpecialistPopup(true)}>
            View All Specialists
          </button>

          <form className="form" onSubmit={handleSpecialistSubmit}>
            <div className="form-group">
              <label htmlFor="specialist">Specialist:</label>
              <input
                type="text"
                id="specialist"
                value={specialistForm.specialist}
                onChange={(e) => setSpecialistForm((prev) => ({ ...prev, specialist: e.target.value }))}
                placeholder="Enter specialist name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={specialistForm.description}
                onChange={(e) => setSpecialistForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter specialist description"
                rows={4}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Specialist
            </button>
          </form>
        </section>
      </div>

      {/* Doctor List Popup */}
      {showDoctorPopup && (
        <div className="popup-overlay" onClick={() => setShowDoctorPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>All Doctors</h3>
              <button className="close-btn" onClick={() => setShowDoctorPopup(false)}>
                ×
              </button>
            </div>
            <div className="popup-body">
              <div className="doctor-list">
                {doctors.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    {loading ? 'Loading doctors...' : 'No doctors found'}
                  </div>
                ) : (
                  doctors.map((doctor) => (
                    <div key={doctor.doctor_id} className="doctor-card" onClick={() => selectDoctor(doctor.doctor_id)}>
                      <h4>{doctor.doctorname}</h4>
                      <p>
                        <strong>ID:</strong> {doctor.doctor_id}
                      </p>
                      <p>
                        <strong>Email:</strong> {doctor.email}
                      </p>
                      <p>
                        <strong>Specialist:</strong> {doctor.specialist_name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {doctor.phone}
                      </p>
                      <p>
                        <strong>Status:</strong> 
                        <span style={{ 
                          color: doctor.assgn_status ? '#28a745' : '#dc3545',
                          fontWeight: 'bold',
                          marginLeft: '5px'
                        }}>
                          {doctor.assgn_status ? 'Assigned' : 'Unassigned'}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Specialist List Popup */}
      {showSpecialistPopup && (
        <div className="popup-overlay" onClick={() => setShowSpecialistPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>All Specialists</h3>
              <button className="close-btn" onClick={() => setShowSpecialistPopup(false)}>
                ×
              </button>
            </div>
            <div className="popup-body">
              <div className="specialist-list">
                {specialists.map((s) => (
                  <div key={s.specialist} className="specialist-card">
                    <h4>{s.specialist}</h4>
                    <p>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
