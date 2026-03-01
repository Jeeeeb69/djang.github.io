// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patients from './components/Patients';
import Doctors from './components/Doctors';
import Appointments from './components/Appointments';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Consistent navbar across all pages */}
      <div className="container mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <h2 className="text-3xl font-bold text-center text-gray-700 mt-10">
                Welcome to the Appointment App
              </h2>
            }
          />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;