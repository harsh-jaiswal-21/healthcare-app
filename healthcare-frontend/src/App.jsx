import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientDetail from './pages/PatientDetail';
import AuditLogs from './pages/AuditLogs';
import api from './services/api';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('access_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    api.post('/auth/logout').catch(() => {});
    localStorage.removeItem('access_token');
    setUser(null);
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading application...</div>;

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard user={user} /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute user={user}><PatientList user={user} /></ProtectedRoute>} />
        <Route path="/patients/:id" element={<ProtectedRoute user={user}><PatientDetail user={user} /></ProtectedRoute>} />
        <Route path="/audit-logs" element={<ProtectedRoute user={user}><AuditLogs /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}