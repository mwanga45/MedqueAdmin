"use client"
import React from 'react';
import Sidebar from '../components/side';
import '../components/side.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout-container">
      <Sidebar />
      <main className="admin-main-content">{children}</main>
    </div>
  );
}
