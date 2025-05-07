from django.contrib import admin
from .models import Delivery, TypesOfPackaging, Services, DeliveryStatus


admin.site.register(Delivery)
admin.site.register(TypesOfPackaging)
admin.site.register(Services)
admin.site.register(DeliveryStatus)
