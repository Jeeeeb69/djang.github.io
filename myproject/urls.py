from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('appointments.urls')),  # all API endpoints
    path('', lambda request: HttpResponseRedirect('/api/')),  # redirect root / → /api/
]