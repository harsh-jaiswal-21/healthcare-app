import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  const token = localStorage.getItem('access_token');
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}