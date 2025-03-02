from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet

# Create a router and register the viewset
router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)  # This makes "employees/" available

urlpatterns = [
    path('', include(router.urls)),  # Include all router-generated URLs
]
