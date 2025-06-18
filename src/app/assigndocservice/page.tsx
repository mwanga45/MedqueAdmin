"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaChevronDown, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './AppointmentPage.css';
import { strict } from 'assert';
import { toast, ToastContainer } from 'react-toastify';
import { apiurl } from '../Apiurl';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
}
interface Requestpayload {
    serviceId :string
    doctor_id :string
}
interface Serv8DocReturn{
    doctor_id :string;
    doctorname:string
    serv_id:string;
    servname:string
}

const AppointmentPage: React.FC = () => {
  // Sample data
  const doctors: Doctor[] = [
    { id: 'd1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { id: 'd2', name: 'Dr. Michael Chen', specialty: 'Neurology' },
    { id: 'd3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics' },
    { id: 'd4', name: 'Dr. James Wilson', specialty: 'Orthopedics' },
    { id: 'd5', name: 'Dr. Lisa Patel', specialty: 'Dermatology' },
  ];

  const services: Service[] = [
    { id: 's1', name: 'General Checkup', category: 'Preventive Care' },
    { id: 's2', name: 'MRI Scan', category: 'Diagnostics' },
    { id: 's3', name: 'Vaccination', category: 'Immunization' },
    { id: 's4', name: 'Physical Therapy', category: 'Rehabilitation' },
    { id: 's5', name: 'Dental Cleaning', category: 'Dentistry' },
  ];


  const [doctorFilter, setDoctorFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [showDoctorFilter, setShowDoctorFilter] = useState(false);
  const [showServiceFilter, setShowServiceFilter] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isMounted, setIsMounted] = useState(false);
// mine
 const [docvsServ, setdocvsServ] = useState<Serv8DocReturn[]>([])
 const [selectedRequest, setselectedRequest] = useState<Requestpayload>({
    serviceId:"",
    doctor_id:""
 })
 const handleOnchangeEvent = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const {}
 }
 const handleDocsvServ = async()=>{
    try{
        const res = await axios.get(apiurl+"adim/DocVsServ")
        if (res.data.success ===false){
            toast.error(res.data.message)
            return
        }
        toast.success(res.data.message)
        setdocvsServ(res.data.data)
    }catch(err){
        toast.error("Error 500")
        console.error(err)
    }

 }
  
  const doctorFilterRef = useRef<HTMLDivElement>(null);
  const serviceFilterRef = useRef<HTMLDivElement>(null);


  const filteredDoctors = docvsServ.filter(doctor => 
    doctor.doctorname.toLowerCase().includes(doctorFilter.toLowerCase())
  );

  const filteredServices = docvsServ.filter(service => 
    service.servname.toLowerCase().includes(serviceFilter.toLowerCase()) 
  );


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (doctorFilterRef.current && !doctorFilterRef.current.contains(event.target as Node)) {
        setShowDoctorFilter(false);
      }
      if (serviceFilterRef.current && !serviceFilterRef.current.contains(event.target as Node)) {
        setShowServiceFilter(false);
      }
      handleDocsvServ()
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoctor && selectedService) {
      alert(`Appointment booked with ${selectedDoctor} for ${selectedService}`);
    } else {
      alert('Please select both a doctor and a service');
    }
  };

  return (
    <div className={`page-container ${isMounted ? 'mounted' : ''}`}>
        <ToastContainer/>
      <div className="header">
        <h1 className="title">Medical Appointment</h1>
        <p className="subtitle">Select your doctor and service</p>
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
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Choose a doctor...</option>
                {filteredDoctors.map(doctor => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.doctor_id} - {doctor.doctorname}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                className="filter-button"
                onClick={() => setShowDoctorFilter(!showDoctorFilter)}
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
                    onChange={(e) => setDoctorFilter(e.target.value)}
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
                value={docvsServ.serv_id}
                onChange={(e) => setSelectedService(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Choose a service...</option>
                {docvsServ.map(s => (
                  <option key={} value={}>
                    {} - {}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                className="filter-button"
                onClick={() => setShowServiceFilter(!showServiceFilter)}
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
                    onChange={(e) => setServiceFilter(e.target.value)}
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
  );
};

export default AppointmentPage;