// frontend/src/services/appointments.ts
import { api } from './api';

export interface Appointment {
  id: number;
  patient: number;
  doctor: number;
  appointment_date: string; // match Django field
  status?: string;          // optional, defaults to "pending" on backend
}

// Fetch all appointments
export const fetchAppointments = async (): Promise<Appointment[]> => {
  const res = await api.get('appointments/');
  return res.data;
};

// Add a new appointment
export const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
  // appointment must have appointment_date
  const res = await api.post('appointments/', appointment);
  return res.data;
};

// Update an existing appointment
export const updateAppointment = async (
  id: number,
  appointment: Partial<Omit<Appointment, 'id'>>
) => {
  const res = await api.put(`appointments/${id}/`, appointment);
  return res.data;
};

// Delete an appointment
export const deleteAppointment = async (id: number) => {
  const res = await api.delete(`appointments/${id}/`);
  return res.data;
};