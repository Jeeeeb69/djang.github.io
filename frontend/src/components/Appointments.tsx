// frontend/src/components/Appointments.tsx
import React, { useState, useEffect } from 'react';
import { fetchAppointments, addAppointment, updateAppointment, deleteAppointment, Appointment as AppointmentType } from '../services/appointments';
import { fetchPatients } from '../services/patients';
import { fetchDoctors } from '../services/doctors';

interface Patient { id: number; name: string; }
interface Doctor { id: number; name: string; }

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [editing, setEditing] = useState<AppointmentType | null>(null);
  const [patientId, setPatientId] = useState<number>(0);
  const [doctorId, setDoctorId] = useState<number>(0);
  const [date, setDate] = useState('');

  const loadData = async () => {
    const [appts, pats, docs] = await Promise.all([
      fetchAppointments(),
      fetchPatients(),
      fetchDoctors()
    ]);
    setAppointments(appts);
    setPatients(pats);
    setDoctors(docs);
  };

  useEffect(() => { loadData(); }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (!patientId || !doctorId || !date) return alert('Fill all fields');

      const payload = { patient: patientId, doctor: doctorId, appointment_date: date };

      if (editing) {
        await updateAppointment(editing.id, payload);
        setEditing(null);
      } else {
        await addAppointment(payload);
      }

      setPatientId(0);
      setDoctorId(0);
      setDate('');
      loadData();
    } catch (err) {
      alert('Error saving appointment');
      console.error(err);
    }
  };

  const handleEdit = (a: AppointmentType) => {
    setEditing(a);
    setPatientId(a.patient);
    setDoctorId(a.doctor);
    setDate(a.appointment_date);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this appointment?')) {
      await deleteAppointment(id);
      loadData();
    }
  };

  return (
    <div className="card bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>

      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Patient</label>
          <select
            value={patientId}
            onChange={e => setPatientId(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            <option value={0}>Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Doctor</label>
          <select
            value={doctorId}
            onChange={e => setDoctorId(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            <option value={0}>Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddOrUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button
              onClick={() => { setEditing(null); setPatientId(0); setDoctorId(0); setDate(''); }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Patient</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => {
            const patient = patients.find(p => p.id === a.patient)?.name || '';
            const doctor = doctors.find(d => d.id === a.doctor)?.name || '';
            return (
              <tr key={a.id}>
                <td className="border px-4 py-2">{patient}</td>
                <td className="border px-4 py-2">{doctor}</td>
                <td className="border px-4 py-2">{a.appointment_date}</td>
                <td className="border px-4 py-2">{a.status}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;