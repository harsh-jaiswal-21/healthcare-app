import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function PatientList({ user }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state for creating a new patient
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'Other',
    medical_history: '',
    contact_number: ''
  });

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients/');
      setPatients(res.data);
    } catch (err) {
      setError('Failed to load synthetic patient records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients/', formData);
      setFormData({ first_name: '', last_name: '', date_of_birth: '', gender: 'Other', medical_history: '', contact_number: '' });
      setShowForm(false);
      fetchPatients();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating patient record');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Synthetic Patient Records</h1>
        {(user?.role === 'doctor' || user?.role === 'admin') && (
          <button onClick={() => setShowForm(!showForm)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            {showForm ? 'Cancel' : 'Add New Patient'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreatePatient} style={{ margin: '1.5rem 0', padding: '1.5rem', background: '#f1f5f9', borderRadius: '8px' }}>
          <h3>Create Patient Record</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required style={{ padding: '0.5rem' }} />
            <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required style={{ padding: '0.5rem' }} />
            <input type="date" value={formData.date_of_birth} onChange={e => setFormData({...formData, date_of_birth: e.target.value})} required style={{ padding: '0.5rem' }} />
            <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{ padding: '0.5rem' }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" placeholder="Contact Number" value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} style={{ padding: '0.5rem' }} />
          </div>
          <textarea placeholder="Medical History" value={formData.medical_history} onChange={e => setFormData({...formData, medical_history: e.target.value})} style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
          <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>Save Patient</button>
        </form>
      )}

      {loading ? <p>Loading...</p> : error ? <p style={{ color: '#ef4444' }}>{error}</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
          <thead>
            <tr style={{ background: '#e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>DOB</th>
              <th style={{ padding: '0.75rem' }}>Gender</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '0.75rem' }}>{p.id}</td>
                <td style={{ padding: '0.75rem' }}>{p.first_name} {p.last_name}</td>
                <td style={{ padding: '0.75rem' }}>{p.date_of_birth}</td>
                <td style={{ padding: '0.75rem' }}>{p.gender}</td>
                <td style={{ padding: '0.75rem' }}>
                  <Link to={`/patients/${p.id}`} style={{ color: '#0284c7', textDecoration: 'none' }}>View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}