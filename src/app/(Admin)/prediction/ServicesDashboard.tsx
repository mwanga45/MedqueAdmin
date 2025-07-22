"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { apiurl } from "../../Apiurl";

interface ServiceDayPrediction {
  service_id: number;
  service_name: string;
  day_of_week: number;
  day_name: string;
  predicted: number;
  actual: number;
}

export default function ServicesDashboard() {
  const [data, setData] = useState<ServiceDayPrediction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [serviceFilter, setServiceFilter] = useState("");
  const [minPredicted, setMinPredicted] = useState(0);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await axios.get(apiurl+"admin/prediction")
        if (res.data.success) {
          setData(res.data.data)
        } else {
          setError(res.data.message || "Failed to fetch prediction data")
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Error fetching prediction data")
      } finally {
        setLoading(false)
      }
    }
    fetchPrediction()
  }, [])

  if (loading) return <div>Loading prediction data...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  // Group by service, with filters
  const grouped = data.reduce((acc, item) => {
    if (
      (!serviceFilter || item.service_name.toLowerCase().includes(serviceFilter.toLowerCase())) &&
      item.predicted >= minPredicted
    ) {
      if (!acc[item.service_name]) acc[item.service_name] = [];
      acc[item.service_name].push(item);
    }
    return acc;
  }, {} as Record<string, ServiceDayPrediction[]>);

  const serviceNames = Object.keys(grouped);
  const slides = Math.ceil(serviceNames.length / 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides) % slides)

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#2c3e50",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >

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
            {Array.from({ length: slides }).map((_, slideIndex) => (
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
                {serviceNames.slice(slideIndex * 3, (slideIndex + 1) * 3).map((serviceName) => {
                  const days = grouped[serviceName]
                  // Calculate today's day index
                  const todayIdx = new Date().getDay()
                  const today = days.find(d => d.day_of_week === todayIdx)
                  // Calculate performance percentage
                  const percentage = today && today.predicted > 0 ? Math.round((today.actual / today.predicted) * 100) : 0
                  return (
                    <div
                      key={serviceName}
                      style={{
                        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                        border: `3px solid #3498db`,
                        borderRadius: "20px",
                        padding: "35px",
                        textAlign: "center",
                        minWidth: "300px",
                        boxShadow: `0 8px 25px rgba(0, 0, 0, 0.1), 0 0 0 1px #3498db20`,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ marginBottom: 16 }}>
                        <svg width={120} height={120} style={{ transform: "rotate(-90deg)" }}>
                          <circle cx={60} cy={60} r={56} stroke="#f0f0f0" strokeWidth="8" fill="transparent" />
                          <circle
                            cx={60}
                            cy={60}
                            r={56}
                            stroke="#3498db"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 56}
                            strokeDashoffset={2 * Math.PI * 56 - (percentage / 100) * 2 * Math.PI * 56}
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
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#2c3e50",
                          }}
                        >
                          {percentage}%
                        </div>
                      </div>
                      <h3
                        style={{
                          margin: "25px 0 15px 0",
                          fontSize: "24px",
                          fontWeight: "600",
                          color: "#2c3e50",
                        }}
                      >
                        {serviceName}
                      </h3>
                      <div style={{ margin: "20px 0 10px 0", fontWeight: 500, color: "#7f8c8d" }}>
                        {today ? `${today.actual}/${today.predicted.toFixed(2)} patients today (${today.day_name})` : "No data for today"}
                      </div>
                    </div>
                  )
                })}
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
          {Array.from({ length: slides }).map((_, index) => (
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

        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, justifyContent: 'center', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Filter by service name..."
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, minWidth: 220 }}
          />
          <input
            type="number"
            placeholder="Min predicted patients"
            value={minPredicted}
            onChange={e => setMinPredicted(Number(e.target.value))}
            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, minWidth: 180 }}
            min={0}
          />
        </div>

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
                  Predicted Patients
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                  Actual Patients (Last)
                </th>
                <th style={{ padding: "20px", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceNames.flatMap(serviceName =>
                grouped[serviceName].map((day, idx) => {
                  const percentage = day.predicted > 0 ? Math.round((day.actual / day.predicted) * 100) : 0
                  return (
                    <tr
                      key={serviceName + "-" + day.day_of_week}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f8f9fa" : "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <td
                        style={{
                          padding: "20px",
                          fontWeight: "600",
                          fontSize: "16px",
                          color: "#2c3e50",
                          borderLeft: `4px solid #3498db`,
                        }}
                      >
                        {serviceName}
                      </td>
                      <td
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          fontSize: "15px",
                          color: "#7f8c8d",
                        }}
                      >
                        {day.day_name}
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
                        {day.predicted.toFixed(2)}
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
                        {day.actual}
                      </td>
                      <td style={{ padding: "20px", textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                          <svg width={50} height={50} style={{ transform: "rotate(-90deg)" }}>
                            <circle cx={25} cy={25} r={22} stroke="#f0f0f0" strokeWidth="6" fill="transparent" />
                            <circle
                              cx={25}
                              cy={25}
                              r={22}
                              stroke="#3498db"
                              strokeWidth="6"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 22}
                              strokeDashoffset={2 * Math.PI * 22 - (percentage / 100) * 2 * Math.PI * 22}
                              strokeLinecap="round"
                              style={{
                                transition: "stroke-dashoffset 2s ease-in-out",
                                filter: "drop-shadow(0 0 6px rgba(52, 152, 219, 0.3))",
                              }}
                            />
                          </svg>
                          <span style={{ fontWeight: "600", fontSize: "16px", color: "#2c3e50" }}>
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
