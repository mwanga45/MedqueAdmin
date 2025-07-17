"use client"

import { useState, useEffect } from "react"

export default function ServicesDashboard() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>([])

  const services = [
    {
      id: 1,
      name: "Emergency Care",
      percentage: 85,
      description: "24/7 emergency medical services",
      expectedDaily: 45,
      todayCount: 38,
      dayName: "Monday",
      color: "#e74c3c",
    },
    {
      id: 2,
      name: "General Consultation",
      percentage: 92,
      description: "General health checkups and consultations",
      expectedDaily: 120,
      todayCount: 110,
      dayName: "Monday",
      color: "#27ae60",
    },
    {
      id: 3,
      name: "Pediatrics",
      percentage: 78,
      description: "Specialized care for children",
      expectedDaily: 35,
      todayCount: 27,
      dayName: "Monday",
      color: "#3498db",
    },
    {
      id: 4,
      name: "Cardiology",
      percentage: 88,
      description: "Heart and cardiovascular care",
      expectedDaily: 25,
      todayCount: 22,
      dayName: "Monday",
      color: "#9b59b6",
    },
    {
      id: 5,
      name: "Orthopedics",
      percentage: 73,
      description: "Bone and joint treatment",
      expectedDaily: 30,
      todayCount: 22,
      dayName: "Monday",
      color: "#f39c12",
    },
    {
      id: 6,
      name: "Radiology",
      percentage: 95,
      description: "Medical imaging services",
      expectedDaily: 60,
      todayCount: 57,
      dayName: "Monday",
      color: "#1abc9c",
    },
  ]

  useEffect(() => {
    // Animate percentages on mount
    const timer = setTimeout(() => {
      setAnimatedPercentages(services.map((service) => service.percentage))
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(services.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(services.length / 3)) % Math.ceil(services.length / 3))
  }

  const CircularProgress = ({
    percentage,
    size = 120,
    color = "#3498db",
  }: { percentage: number; size?: number; color?: string }) => {
    const radius = (size - 8) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#f0f0f0" strokeWidth="8" fill="transparent" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 2s ease-in-out",
              filter: "drop-shadow(0 0 6px rgba(52, 152, 219, 0.3))",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: size > 60 ? "18px" : "12px",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          {percentage}%
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#2c3e50",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "30px 20px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderBottom: "3px solid #3498db",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Medical Services Dashboard
        </h1>
        <p
          style={{
            margin: "15px 0 0 0",
            fontSize: "18px",
            color: "#7f8c8d",
            fontWeight: "400",
          }}
        >
          Real-time service performance and patient statistics
        </p>
      </header>

      {/* Services Slider */}
      <section
        style={{
          padding: "50px 20px",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "32px",
            fontWeight: "600",
            color: "#2c3e50",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Service Performance Overview
        </h2>

        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "0 auto",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Slider Container */}
          <div
            style={{
              display: "flex",
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {Array.from({ length: Math.ceil(services.length / 3) }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                style={{
                  minWidth: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                  flexWrap: "wrap",
                  padding: "20px",
                }}
              >
                {services.slice(slideIndex * 3, (slideIndex + 1) * 3).map((service, index) => (
                  <div
                    key={service.id}
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                      border: `3px solid ${service.color}`,
                      borderRadius: "20px",
                      padding: "35px",
                      textAlign: "center",
                      minWidth: "300px",
                      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px ${service.color}20`,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px)"
                      e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.15), 0 0 0 1px ${service.color}40`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = `0 8px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px ${service.color}20`
                    }}
                  >
                    <CircularProgress
                      percentage={animatedPercentages[slideIndex * 3 + index] || 0}
                      color={service.color}
                    />
                    <h3
                      style={{
                        margin: "25px 0 15px 0",
                        fontSize: "24px",
                        fontWeight: "600",
                        color: "#2c3e50",
                      }}
                    >
                      {service.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: "#7f8c8d",
                        fontSize: "16px",
                        lineHeight: "1.5",
                      }}
                    >
                      {service.description}
                    </p>
                    <div
                      style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        backgroundColor: `${service.color}15`,
                        borderRadius: "25px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: service.color,
                      }}
                    >
                      {service.todayCount}/{service.expectedDaily} patients today
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "24px",
              cursor: "pointer",
              zIndex: 1,
              boxShadow: "0 4px 15px rgba(52, 152, 219, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.6)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)"
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.4)"
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "24px",
              cursor: "pointer",
              zIndex: 1,
              boxShadow: "0 4px 15px rgba(52, 152, 219, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.6)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(-50%) scale(1)"
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.4)"
            }}
          >
            ›
          </button>
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2px solid #3498db",
                background: currentSlide === index ? "linear-gradient(135deg, #3498db 0%, #2980b9 100%)" : "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: currentSlide === index ? "0 0 10px rgba(52, 152, 219, 0.5)" : "none",
              }}
            />
          ))}
        </div>
      </section>

      {/* Detailed Table */}
      <section
        style={{
          padding: "50px 20px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "32px",
            fontWeight: "600",
            color: "#2c3e50",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Detailed Service Statistics
        </h2>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            overflowX: "auto",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                  color: "#fff",
                }}
              >
                <th style={{ padding: "20px", textAlign: "left", fontSize: "16px", fontWeight: "600" }}>
                  Service Name
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Day</th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                  Expected Patients/Day
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                  Patients Today
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                  Performance
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e3f2fd"
                    e.currentTarget.style.transform = "scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f8f9fa" : "#fff"
                    e.currentTarget.style.transform = "scale(1)"
                  }}
                >
                  <td
                    style={{
                      padding: "20px",
                      fontWeight: "600",
                      fontSize: "16px",
                      color: "#2c3e50",
                      borderLeft: `4px solid ${service.color}`,
                    }}
                  >
                    {service.name}
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "15px",
                      color: "#7f8c8d",
                    }}
                  >
                    {service.dayName}
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#3498db",
                    }}
                  >
                    {service.expectedDaily}
                  </td>
                  <td
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#27ae60",
                    }}
                  >
                    {service.todayCount}
                  </td>
                  <td style={{ padding: "20px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                      <CircularProgress percentage={service.percentage} size={50} color={service.color} />
                      <span style={{ fontWeight: "600", fontSize: "16px", color: "#2c3e50" }}>
                        {service.percentage}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "20px", textAlign: "center" }}>
                    <span
                      style={{
                        padding: "8px 16px",
                        borderRadius: "25px",
                        fontSize: "14px",
                        fontWeight: "600",
                        background:
                          service.percentage >= 80
                            ? "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)"
                            : service.percentage >= 60
                              ? "linear-gradient(135deg, #3498db 0%, #5dade2 100%)"
                              : "linear-gradient(135deg, #e74c3c 0%, #ec7063 100%)",
                        color: "#fff",
                        boxShadow:
                          service.percentage >= 80
                            ? "0 4px 15px rgba(39, 174, 96, 0.3)"
                            : service.percentage >= 60
                              ? "0 4px 15px rgba(52, 152, 219, 0.3)"
                              : "0 4px 15px rgba(231, 76, 60, 0.3)",
                      }}
                    >
                      {service.percentage >= 80 ? "Excellent" : service.percentage >= 60 ? "Good" : "Needs Attention"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary Stats */}
      <section
        style={{
          padding: "50px 20px",
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #3498db 0%, #5dade2 100%)",
              padding: "30px",
              borderRadius: "20px",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(52, 152, 219, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "42px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {services.reduce((sum, service) => sum + service.todayCount, 0)}
            </h3>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "500" }}>Total Patients Today</p>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
              padding: "30px",
              borderRadius: "20px",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(39, 174, 96, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "42px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {services.reduce((sum, service) => sum + service.expectedDaily, 0)}
            </h3>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "500" }}>Expected Daily Total</p>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #9b59b6 0%, #bb6bd9 100%)",
              padding: "30px",
              borderRadius: "20px",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(155, 89, 182, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "42px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {Math.round(services.reduce((sum, service) => sum + service.percentage, 0) / services.length)}%
            </h3>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "500" }}>Average Performance</p>
          </div>
          <div
            style={{
              textAlign: "center",
              background: "linear-gradient(135deg, #f39c12 0%, #f5b041 100%)",
              padding: "30px",
              borderRadius: "20px",
              minWidth: "200px",
              boxShadow: "0 8px 25px rgba(243, 156, 18, 0.3)",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "42px",
                fontWeight: "700",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              {services.length}
            </h3>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "500" }}>Active Services</p>
          </div>
        </div>
      </section>
    </div>
  )
}
