import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Router } from './Router/Router';
import { AuthProvider } from './Auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider >
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </AuthProvider>
);

reportWebVitals();
