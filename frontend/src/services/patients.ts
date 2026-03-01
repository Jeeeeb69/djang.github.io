// frontend/src/services/patients.ts
import { api } from './api';

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string; // make sure this matches your Django model
}

// Fetch all patients
export const fetchPatients = async (): Promise<Patient[]> => {
  const res = await api.get('patients/');
  return res.data;
};

// Add a new patient
export const addPatient = async (patient: Omit<Patient, 'id'>) => {
  const res = await api.post('patients/', patient);
  return res.data;
};

// Update an existing patient
export const updatePatient = async (
  id: number,
  patient: Partial<Omit<Patient, 'id'>>
) => {
  const res = await api.put(`patients/${id}/`, patient);
  return res.data;
};

// Delete a patient
export const deletePatient = async (id: number) => {
  const res = await api.delete(`patients/${id}/`);
  return res.data;
};