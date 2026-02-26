from django.urls import path
from .views import (
    PatientListCreateView, PatientRetrieveDestroyView,
    DoctorListCreateView, DoctorRetrieveDestroyView,
    AppointmentListCreateView, AppointmentRetrieveDestroyView,
    api_root
)

urlpatterns = [
    path('', api_root, name='api-root'),
    path('patients/', PatientListCreateView.as_view(), name='patients-list-create'),
    path('patients/<int:pk>/', PatientRetrieveDestroyView.as_view(), name='patients-detail-delete'),
    path('doctors/', DoctorListCreateView.as_view(), name='doctors-list-create'),
    path('doctors/<int:pk>/', DoctorRetrieveDestroyView.as_view(), name='doctors-detail-delete'),
    path('appointments/', AppointmentListCreateView.as_view(), name='appointments-list-create'),
    path('appointments/<int:pk>/', AppointmentRetrieveDestroyView.as_view(), name='appointments-detail-delete'),
]