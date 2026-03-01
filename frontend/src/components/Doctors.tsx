// frontend/src/components/Doctors.tsx
import React, { useState, useEffect } from 'react';
import { fetchDoctors, addDoctor, updateDoctor, deleteDoctor } from '../services/doctors';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editing, setEditing] = useState<Doctor | null>(null);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');

  const loadDoctors = async () => {
    setDoctors(await fetchDoctors());
  };

  useEffect(() => { loadDoctors(); }, []);

  const handleAddOrUpdate = async () => {
    if (!name || !specialization) return alert('Fill all fields');
    if (editing) {
      await updateDoctor(editing.id, { name, specialization });
      setEditing(null);
    } else {
      await addDoctor({ name, specialization });
    }
    setName(''); setSpecialization('');
    loadDoctors();
  };

  const handleEdit = (d: Doctor) => {
    setEditing(d);
    setName(d.name); setSpecialization(d.specialization);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this doctor?')) {
      await deleteDoctor(id);
      loadDoctors();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Specialization" value={specialization} onChange={e => setSpecialization(e.target.value)} className="border p-2 rounded" />
          <button onClick={handleAddOrUpdate} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
            {editing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Specialization</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id} className="border-b">
              <td className="py-2 px-4">{d.name}</td>
              <td className="py-2 px-4">{d.specialization}</td>
              <td className="py-2 px-4 space-x-2">
                <button onClick={() => handleEdit(d)} className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                <button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;