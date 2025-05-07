from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    LoginView,
    TypesOfPackagingViewSet,
    ServicesViewSet,
    DeliveryStatusViewSet,
    DeliveryViewSet,
    csrf_view,
    CheckAuthView
)


router = DefaultRouter()
router.register(r'types-of-packing', TypesOfPackagingViewSet)
router.register(r'services', ServicesViewSet)
router.register(r'delivery-status', DeliveryStatusViewSet)
router.register(r'deliveries', DeliveryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
    path("csrf/", csrf_view),
    path("check-auth/", CheckAuthView.as_view()),
]
