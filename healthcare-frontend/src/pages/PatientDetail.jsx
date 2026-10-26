import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PatientDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(err => setError('Patient not found or unauthorized.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      try {
        await api.delete(`/patients/${id}`);
        navigate('/patients');
      } catch (err) {
        alert(err.response?.data?.detail || 'Delete failed');
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading patient details...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1>Patient Record #{patient.id}</h1>
      <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <p><strong>First Name:</strong> {patient.first_name}</p>
        <p><strong>Last Name:</strong> {patient.last_name}</p>
        <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Contact Number:</strong> {patient.contact_number || 'N/A'}</p>
        <p><strong>Medical History:</strong> {patient.medical_history || 'None recorded'}</p>
      </div>
      {user?.role === 'admin' && (
        <button onClick={handleDelete} style={{ marginTop: '1.5rem', background: '#ef4444', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', borderRadius: '4px' }}>
          Delete Patient Record (Admin Only)
        </button>
      )}
    </div>
  );
}