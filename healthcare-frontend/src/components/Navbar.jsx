import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#0284c7', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>Healthcare Portal</h2>
      {user && (
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/patients" style={{ color: '#fff', textDecoration: 'none' }}>Patients</Link>
          {user.role === 'admin' && (
            <Link to="/audit-logs" style={{ color: '#fff', textDecoration: 'none' }}>Audit Logs</Link>
          )}
          <span>Role: <strong>{user.role}</strong></span>
          <button onClick={handleLogoutClick} style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}