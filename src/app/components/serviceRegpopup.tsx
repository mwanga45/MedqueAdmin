"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiurl} from "../Apiurl"
import { FaTimes, FaPlus, FaList, FaUser, FaEnvelope, FaPhone, FaBuilding, FaServicestack } from "react-icons/fa"

interface Service {
  id :number
  servicename:string
  duration_minutes :number
  fee :Float32Array
  consultantFeee: string
  created_at: string

}



export default function ServicePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"list" | "register">("list")
  const [services, setServices] = useState<Service[]>([])

  const [formData, setFormData] = useState({
    servname:"",
    duration_time:0,
    fee:0
  })
  const handlegetregisteredServ = async()=>{
    try{
      const res  =  await axios.get(apiurl+"booking/getservice")
      if (res.data.success === false){
        alert(res.data.message)
      }
      setServices(res.data.data)

    }catch(err){
      alert("Internal server Error")
      console.error("something went wrong", err)
    }
  }
  useEffect(()=>{
   handlegetregisteredServ()
},[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const res =  await axios.post(apiurl +"adim/registerserv",formData)
       if (res.data.success == false){
        alert(res.data.message||"Something went wrong")
       }else if (res.data.success == true){
          alert(res.data.message&&res.data.data)
       }
    }catch (err){
      alert(err)
      console.log("Something went wrong", err)
    }

  }
  return (
    <div className="app-container">
      <button className="open-popup-btn" onClick={() => setIsOpen(true)}>
        <FaServicestack /> Open Service Manager
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h2>Service Manager</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="tab-navigation">
              <button
                className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
                onClick={() => setActiveTab("list")}
              >
                <FaList /> Service List
              </button>
              <button
                className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
                onClick={() => setActiveTab("register")}
              >
                <FaPlus /> Register Service
              </button>
            </div>

            <div className="popup-content">
              {activeTab === "list" ? (
                <div className="service-list">
                  <h3>Existing Services ({services.length})</h3>
                  {services.length === 0 ? (
                    <div className="empty-state">
                      <FaServicestack size={48} />
                      <p>No services registered yet</p>
                    </div>
                  ) : (
                    <div className="services-grid">
                      {services.map((service) => (
                        <div key={service.id} className="service-card">
                          <div className="service-header">
                            <h4>{service.servicename}</h4>
                            <span className="category-badge">{service.id}</span>
                          </div>
                          <div className="service-details">
                            <div className="detail-item">
                              <FaUser /> <span>{service.duration_minutes}</span>
                            </div>
                            <div className="detail-item">
                              <FaEnvelope /> <span>{service.fee}</span>
                            </div>
                            <div className="detail-item">
                              <FaPhone /> <span>{service.created_at}</span>
                            </div>
                          </div>
                          <p className="service-description">none</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="register-form">
                  <h3>Register New Service</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">
                        <FaServicestack /> Service Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="servname"
                        value={formData.servname}
                        onChange={handleInputChange}
                        placeholder="Enter service name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="provider">
                        <FaUser /> Provider Name
                      </label>
                      <input
                        type="number"
                        id="provider"
                        name="duration_time"
                        value={formData.duration_time}
                        onChange={handleInputChange}
                        placeholder="Enter time required"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="provider">
                        <FaUser /> Provider Name
                      </label>
                      <input
                        type='number'
                        id="provider"
                        name="fee"
                        value={formData.fee}
                        onChange={handleInputChange}
                        placeholder="Enter provider name"
                        required
                      />
                    </div>

                    {/* <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">
                          <FaEnvelope /> Email
                        </label>
                        <input
                          type="number"
                          id="email"
                          name="email"
                          value={formData.fee}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          required
                        />
                      </div> */}

                      {/* <div className="form-group">
                        <label htmlFor="phone">
                          <FaPhone /> Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div> */}
{/* 
                    <div className="form-group">
                      <label htmlFor="category">
                        <FaBuilding /> Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    {/* <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter service description"
                        rows={4}
                        required
                      />
                    </div> */}

                    <div className="form-actions">
                      <button type="button" className="cancel-btn" onClick={() => setActiveTab("list")}>
                        Cancel
                      </button>
                      <button type="submit" className="submit-btn">
                        <FaPlus /> Register Service
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .open-popup-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
          transition: all 0.3s ease;
        }

        .open-popup-btn:hover {
          background: #4338ca;
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(79, 70, 229, 0.4);
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .popup-container {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: popupSlideIn 0.3s ease-out;
        }

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .popup-header {
          background: #f8fafc;
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .popup-header h2 {
          margin: 0;
          color: #1e293b;
          font-size: 24px;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .tab-navigation {
          display: flex;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
        }

        .tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 16px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
          color: #64748b;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }

        .tab-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .tab-btn.active {
          background: white;
          color: #4f46e5;
          border-bottom-color: #4f46e5;
        }

        .popup-content {
          padding: 24px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .service-list h3 {
          margin: 0 0 20px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }

        .empty-state p {
          margin: 16px 0 0 0;
          font-size: 18px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .service-card:hover {
          border-color: #4f46e5;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
        }

        .service-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .service-header h4 {
          margin: 0;
          color: #1e293b;
          font-size: 18px;
          font-weight: 600;
        }

        .category-badge {
          background: #4f46e5;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .service-details {
          margin-bottom: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #64748b;
          font-size: 14px;
        }

        .service-description {
          color: #475569;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        .register-form h3 {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 20px;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #374151;
          font-weight: 500;
          font-size: 14px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .cancel-btn {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #d1d5db;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: #e2e8f0;
          color: #1e293b;
        }

        .submit-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          background: #4338ca;
        }

        @media (max-width: 768px) {
          .popup-container {
            width: 95%;
            margin: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .tab-btn {
            font-size: 14px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  )
}
