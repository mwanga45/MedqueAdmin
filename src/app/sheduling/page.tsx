"use client"

import type React from "react"

import { useState } from "react"
import "./sheduling.css"

interface Doctor {
  doctor_id: number
  name: string
  email: string
  specialist: string
  phone: string
}

interface Specialist {
  id: number
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

  // Mock data
  const doctors: Doctor[] = [
    {
      doctor_id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      specialist: "Cardiology",
      phone: "+1-555-0123",
    },
    {
      doctor_id: 2,
      name: "Dr. Michael Chen",
      email: "michael.chen@hospital.com",
      specialist: "Neurology",
      phone: "+1-555-0124",
    },
    {
      doctor_id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@hospital.com",
      specialist: "Pediatrics",
      phone: "+1-555-0125",
    },
    {
      doctor_id: 4,
      name: "Dr. James Wilson",
      email: "james.wilson@hospital.com",
      specialist: "Orthopedics",
      phone: "+1-555-0126",
    },
  ]

  const specialists: Specialist[] = [
    {
      id: 1,
      specialist: "Cardiology",
      description:
        "Specializes in heart and cardiovascular system disorders, including heart disease, arrhythmias, and heart failure.",
    },
    {
      id: 2,
      specialist: "Neurology",
      description:
        "Focuses on disorders of the nervous system, including brain, spinal cord, and nerve-related conditions.",
    },
    {
      id: 3,
      specialist: "Pediatrics",
      description:
        "Provides medical care for infants, children, and adolescents, focusing on their physical and mental development.",
    },
    {
      id: 4,
      specialist: "Orthopedics",
      description: "Treats musculoskeletal system disorders, including bones, joints, ligaments, tendons, and muscles.",
    },
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Schedule submitted:", scheduleForm)
    alert("Schedule registered successfully!")
    setScheduleForm({
      doctor_id: "",
      day_of_week: "",
      start_time: "",
      end_time: "",
    })
  }

  const handleSpecialistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Specialist submitted:", specialistForm)
    alert("Specialist added successfully!")
    setSpecialistForm({
      specialist: "",
      description: "",
    })
  }

  const selectDoctor = (doctorId: number) => {
    setScheduleForm((prev) => ({ ...prev, doctor_id: doctorId.toString() }))
    setShowDoctorPopup(false)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Doctor Management System</h1>
      </header>

      <div className="main-content">
        {/* Doctor Schedule Registration Section */}
        <section className="section">
          <h2>Doctor Schedule Registration</h2>

          <button className="btn btn-primary" onClick={() => setShowDoctorPopup(true)}>
            View All Doctors
          </button>

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
                {doctors.map((doctor) => (
                  <div key={doctor.doctor_id} className="doctor-card" onClick={() => selectDoctor(doctor.doctor_id)}>
                    <h4>{doctor.name}</h4>
                    <p>
                      <strong>ID:</strong> {doctor.doctor_id}
                    </p>
                    <p>
                      <strong>Email:</strong> {doctor.email}
                    </p>
                    <p>
                      <strong>Specialist:</strong> {doctor.specialist}
                    </p>
                    <p>
                      <strong>Phone:</strong> {doctor.phone}
                    </p>
                  </div>
                ))}
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
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="specialist-card">
                    <h4>{specialist.specialist}</h4>
                    <p>{specialist.description}</p>
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
