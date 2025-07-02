"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './AppointmentPage.css';
import { toast, ToastContainer } from 'react-toastify';
import { apiurl } from '../Apiurl';
import AnimatedTable from '../components/table';

interface DoctorInfo {
  doctor_id: number;
  doctorname: string;
}

interface ServiceInfo {
  serv_id: number;
  servicename: string;
}

interface CombinedResponse {
  doctors: DoctorInfo[];
  services: ServiceInfo[];
}

interface RequestPayload {
  doctor_id: string;
  serviceId: string;
}

const AppointmentPage: React.FC = () => {
  const [doctorFilter, setDoctorFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [showDoctorFilter, setShowDoctorFilter] = useState(false);
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestPayload>({
    doctor_id: "",
    serviceId: ""
  });

  const fetchLists = async () => {
    try {
      const res = await axios.get(apiurl + "adim/DocVsServ");
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      const data: CombinedResponse = res.data.data;
      setDoctors(data.doctors ?? []);
      setServices(data.services ?? []);
    } catch (err) {
      toast.error("Error fetching lists");
      console.error(err);
    }
  };

  const doctorFilterRef = useRef<HTMLDivElement>(null);
  const serviceFilterRef = useRef<HTMLDivElement>(null);

  
  const filteredDoctors = doctors.filter(d =>
    d.doctorname.toLowerCase().includes(doctorFilter.trim().toLowerCase())
  );


  const filteredServices = services.filter(s =>
    s.servicename.toLowerCase().includes(serviceFilter.trim().toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (doctorFilterRef.current && !doctorFilterRef.current.contains(e.target as Node)) {
        setShowDoctorFilter(false);
      }
      if (serviceFilterRef.current && !serviceFilterRef.current.contains(e.target as Node)) {
        setShowServiceFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    fetchLists();
  }, []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
       try{
        const res = await axios.post(apiurl+"adim/docAsgnServ",selectedRequest)
         if (res.data.success ===false){
          toast.error(res.data.message)
          return
         }
         toast.success("Successfuly Accomplish request")
        
       }catch(err){
        console.error(err)
        toast.error("Network Error")
       }
    console.log(selectedRequest);
  };

  return (
    <div>
    <div className={`page-container ${isMounted ? 'mounted' : ''}`}>
      <ToastContainer />
      <div className="header">
        <h1 className="title">Admin Center</h1>
        <p className="subtitle">Select your doctor and service for Assign the Service</p>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="doctor-select" className="form-label">
            Select a Doctor:
          </label>
          <div className="select-wrapper" ref={doctorFilterRef}>
            <div className="select-header">
              <select
                id="doctor-select"
                value={selectedRequest.doctor_id}
                onChange={e =>
                  setSelectedRequest(prev => ({ ...prev, doctor_id: e.target.value }))
                }
                className="form-select"
                required
              >
                <option value="">Choose a doctor...</option>
                {filteredDoctors.map(d => (
                  <option key={d.doctor_id} value={d.doctor_id}>
                    {d.doctor_id} — {d.doctorname}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="filter-button"
                onClick={() => setShowDoctorFilter(f => !f)}
              >
                <FaFilter />
              </button>
            </div>
            {showDoctorFilter && (
              <div className="filter-dropdown slide-down">
                <div className="filter-input-group">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Filter doctors..."
                    value={doctorFilter}
                    onChange={e => setDoctorFilter(e.target.value)}
                    className="filter-input"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="service-select" className="form-label">
            Select a Service:
          </label>
          <div className="select-wrapper" ref={serviceFilterRef}>
            <div className="select-header">
              <select
                id="service-select"
                value={selectedRequest.serviceId}
                onChange={e =>
                  setSelectedRequest(prev => ({ ...prev, serviceId: e.target.value }))
                }
                className="form-select"
                required
              >
                <option value="">Choose a service...</option>
                {filteredServices.map(s => (
                  <option key={s.serv_id} value={s.serv_id}>
                    {s.serv_id} — {s.servicename}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="filter-button"
                onClick={() => setShowServiceFilter(s => !s)}
              >
                <FaFilter />
              </button>
            </div>
            {showServiceFilter && (
              <div className="filter-dropdown slide-down">
                <div className="filter-input-group">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Filter services..."
                    value={serviceFilter}
                    onChange={e => setServiceFilter(e.target.value)}
                    className="filter-input"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">
            Confirm Appointment
          </button>
        </div>
      </form>
    </div>
    <AnimatedTable/>
    </div>
  );
};

export default AppointmentPage;
