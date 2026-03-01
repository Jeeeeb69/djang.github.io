// frontend/src/components/Patients.tsx
import React, { useState, useEffect } from 'react';
import { fetchPatients, addPatient, updatePatient, deletePatient } from '../services/patients';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editing, setEditing] = useState<Patient | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const loadPatients = async () => {
    setPatients(await fetchPatients());
  };

  useEffect(() => { loadPatients(); }, []);

  const handleAddOrUpdate = async () => {
    if (!name || !email || !phone) return alert('Fill all fields');
    if (editing) {
      await updatePatient(editing.id, { name, email, phone });
      setEditing(null);
    } else {
      await addPatient({ name, email, phone });
    }
    setName(''); setEmail(''); setPhone('');
    loadPatients();
  };

  const handleEdit = (p: Patient) => {
    setEditing(p);
    setName(p.name); setEmail(p.email); setPhone(p.phone);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this patient?')) {
      await deletePatient(id);
      loadPatients();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Patients</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" />
          <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="border p-2 rounded" />
          <button onClick={handleAddOrUpdate} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
            {editing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className="border-b">
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.email}</td>
              <td className="py-2 px-4">{p.phone}</td>
              <td className="py-2 px-4 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;