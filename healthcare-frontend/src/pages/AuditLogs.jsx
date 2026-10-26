import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/audit-logs/')
      .then(res => setLogs(res.data))
      .catch(err => setError('Access denied. Admin role required.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading audit logs...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Security Audit Logs</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
        <thead>
          <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem' }}>ID</th>
            <th style={{ padding: '0.75rem' }}>Timestamp</th>
            <th style={{ padding: '0.75rem' }}>User</th>
            <th style={{ padding: '0.75rem' }}>Action</th>
            <th style={{ padding: '0.75rem' }}>Endpoint</th>
            <th style={{ padding: '0.75rem' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
              <td style={{ padding: '0.75rem' }}>{log.id}</td>
              <td style={{ padding: '0.75rem' }}>{new Date(log.timestamp).toLocaleString()}</td>
              <td style={{ padding: '0.75rem' }}>{log.username}</td>
              <td style={{ padding: '0.75rem' }}>{log.action}</td>
              <td style={{ padding: '0.75rem' }}>{log.endpoint}</td>
              <td style={{ padding: '0.75rem' }}>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}