from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, DoctorViewSet, AppointmentViewSet, home

# Router for API
router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)

# URL patterns for this app
urlpatterns = [
    path('', home, name='home'),             # Homepage
    path('api/', include(router.urls)),      # API endpoints
]