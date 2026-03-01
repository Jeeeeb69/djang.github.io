// frontend/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow mb-6">
      <div className="container mx-auto flex space-x-6">
        <Link to="/patients" className="hover:text-blue-200 font-semibold">Patients</Link>
        <Link to="/doctors" className="hover:text-blue-200 font-semibold">Doctors</Link>
        <Link to="/appointments" className="hover:text-blue-200 font-semibold">Appointments</Link>
      </div>
    </nav>
  );
};

export default Navbar;