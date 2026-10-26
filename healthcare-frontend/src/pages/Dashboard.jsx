import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{user?.username}</strong>!</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', background: '#e0f2fe', borderRadius: '8px' }}>
          <h3>Role Privileges</h3>
          <p>Your current assigned role is <strong>{user?.role}</strong>.</p>
        </div>
        <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '8px' }}>
          <h3>Compliance Notice</h3>
          <p>All clinical updates, data views, and administrative modifications are securely audit-logged.</p>
        </div>
      </div>
    </div>
  );
}