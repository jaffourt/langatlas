from django.urls import path
from .views import UserAPIView

urlpatterns = [
    path('users', UserAPIView.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('users/<str:pk>', UserAPIView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    })),
]