from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('appointments.urls')),  # root + api handled inside appointments
    path('admin/', admin.site.urls),
]