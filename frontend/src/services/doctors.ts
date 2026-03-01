// frontend/src/services/doctors.ts
import { api } from './api';

export interface Doctor {
  id: number;
  name: string;
  specialization: string; // matches your Django model
}

// Fetch all doctors
export const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await api.get('doctors/');
  return res.data;
};

// Add a new doctor
export const addDoctor = async (doctor: Omit<Doctor, 'id'>) => {
  const res = await api.post('doctors/', doctor);
  return res.data;
};

// Update an existing doctor
export const updateDoctor = async (
  id: number,
  doctor: Partial<Omit<Doctor, 'id'>>
) => {
  const res = await api.put(`doctors/${id}/`, doctor);
  return res.data;
};

// Delete a doctor
export const deleteDoctor = async (id: number) => {
  const res = await api.delete(`doctors/${id}/`);
  return res.data;
};