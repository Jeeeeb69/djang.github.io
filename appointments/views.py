from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Patient, Doctor, Appointment
from .serializers import PatientSerializer, DoctorSerializer, AppointmentSerializer

# Patients
class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# Doctors
class DoctorListCreateView(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class DoctorRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

# Appointments
class AppointmentListCreateView(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentRetrieveDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

# API root for /api/
@api_view(['GET'])
def api_root(request):
    return Response({
        "patients": "/api/patients/",
        "doctors": "/api/doctors/",
        "appointments": "/api/appointments/"
    })