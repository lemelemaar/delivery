from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets

from .models import TypesOfPackaging, Services, DeliveryStatus, Delivery
from .serializer import TypesOfPackagingSerializer, ServicesSerializer, DeliveryStatusSerializer, DeliverySerializer

# Проверка авторизации
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'Пользователь авторизован', 'username': request.user.username})


# Авторизация
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Успешный вход'}, status=status.HTTP_200_OK)
        return Response({'error': 'Неверные учетные данные'}, status=status.HTTP_401_UNAUTHORIZED)


class TypesOfPackagingViewSet(viewsets.ModelViewSet):
    queryset = TypesOfPackaging.objects.all()
    serializer_class = TypesOfPackagingSerializer


class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer


class DeliveryStatusViewSet(viewsets.ModelViewSet):
    queryset = DeliveryStatus.objects.all()
    serializer_class = DeliveryStatusSerializer


class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer


# Получение csrf
@ensure_csrf_cookie
def csrf_view(request):
    return JsonResponse({'message': 'CSRF cookie set'})
