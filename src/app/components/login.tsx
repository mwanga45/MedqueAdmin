"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLogOutSharp } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { apiurl } from "../Apiurl";

interface LoginProps {
    changeToRegister: () => void
}

interface FormData {
    username: string;
    registrationNumber: string;
    password: string;
}

type UserType = 'admin' | 'doctor';

export default function Login({ changeToRegister }: LoginProps) {
    const router = useRouter();
    const [userType, setUserType] = useState<UserType>('admin');
    const [formData, setFormData] = useState<FormData>({
        username: '',
        registrationNumber: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleUserTypeChange = (type: UserType) => {
        setUserType(type);
        setError('');
        // Reset form when switching user types
        setFormData({
            username: '',
            registrationNumber: '',
            password: ''
        });
    };

    const handleToRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        changeToRegister();
    };

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        // Basic validation
        if (!formData.username || !formData.password) {
            setError('Please fill in all required fields');
            setIsLoading(false);
            return;
        }

        // For doctor login, registration number is required
        if (userType === 'doctor' && !formData.registrationNumber) {
            setError('Registration number is required for doctor login');
            setIsLoading(false);
            return;
        }

        try {
            let response;
            
            if (userType === 'doctor') {
                // Doctor login request
                response = await axios.post(`${apiurl}dkt/login`, {
                    username: formData.username,
                    regNo: formData.registrationNumber,
                    password: formData.password
                });
            } else {
                
                response = await axios.post(`${apiurl}adim/login`, {
                    username: formData.username,
                    password: formData.password
                });
            }

            if (response.data.success) {
                if (response.data.data && response.data.data.token) {
                    localStorage.setItem('token', response.data.data.token);
                    localStorage.setItem('userType', userType);
                    localStorage.setItem('userData', JSON.stringify(response.data.data.doctor || response.data.data.admin));
                }
                
                toast.success(response.data.message || 'Login successful!');
                
               
                if (userType === 'admin') {
                    router.push("/dashboard");
                } else {
                    router.push("/doctor-dashboard");
                }
            } else {
                setError(response.data.message || 'Login failed');
                toast.error(response.data.message || 'Login failed');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            
            if (err.response) {
                // Server responded with error status
                const errorMessage = err.response.data?.message || 'Login failed';
                setError(errorMessage);
                toast.error(errorMessage);
            } else if (err.request) {
                // Network error
                setError('Network error. Please check your connection.');
                toast.error('Network error. Please check your connection.');
            } else {
                // Other error
                setError('Login failed. Please try again.');
                toast.error('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="log-container">
            <ToastContainer />
            <div className="logTitle">
                <p>{userType === 'admin' ? 'Admin Login' : 'Doctor Login'}</p>
            </div>

            {/* User Type Selection */}
            <div className="user-type-selector" style={{ 
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }}>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666'
                }}>
                    {userType === 'admin' ? 'Admin' : 'Doctor'}
                </span>
                <div 
                    onClick={() => handleUserTypeChange(userType === 'admin' ? 'doctor' : 'admin')}
                    style={{
                        width: '60px',
                        height: '30px',
                        backgroundColor: userType === 'admin' ? '#007bff' : '#28a745',
                        borderRadius: '15px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    <div style={{
                        width: '26px',
                        height: '26px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: userType === 'admin' ? '2px' : '32px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                </div>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666'
                }}>
                    {userType === 'admin' ? 'Doctor' : 'Admin'}
                </span>
            </div>

            {error && (
                <div style={{
                    color: 'red',
                    backgroundColor: '#ffe6e6',
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <form>
                <div className="log-inputConatiner">
                    <label htmlFor="username-input">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username-input"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {userType === 'doctor' && (
                    <div className="log-inputConatiner">
                        <label htmlFor="registration-number-input">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            id="registration-number-input"
                            placeholder="Enter your registration number"
                            value={formData.registrationNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                )}

                <div className="log-inputConatiner">
                    <label htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="logbtn-container">
                    <button 
                        type="submit" 
                        name="login" 
                        className="log-btn" 
                        onClick={handleLogin}
                        disabled={isLoading}
                        style={{
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <div className="cross-line"></div>
                <button className="jump-to" onClick={handleToRegister}>
                    Register here <IoLogOutSharp />
                </button>
            </form>
        </div>
    );
}
