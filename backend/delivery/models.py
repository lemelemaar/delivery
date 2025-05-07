from django.db import models


class TypesOfPackaging(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Services(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class DeliveryStatus(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Delivery(models.Model):
    title = models.CharField(verbose_name="Наименование заказа", max_length=100)
    transport_models = models.CharField(verbose_name="Модель транспорта", max_length=100)
    types_of_packaging = models.ForeignKey(
        TypesOfPackaging,
        on_delete=models.CASCADE,
        related_name='top_delivery',
        verbose_name="Тип упаковки"
    )
    services = models.ForeignKey(
        Services,
        on_delete=models.CASCADE,
        related_name='service_delivery',
        verbose_name="Услуга"
    )
    delivery_status = models.ForeignKey(
        DeliveryStatus,
        on_delete=models.CASCADE,
        related_name='status_delivery',
        verbose_name="Статус доставки"
    )
    types_of_cargo = models.CharField(max_length=100, verbose_name="Тип груза")
    distance = models.PositiveSmallIntegerField(verbose_name="Дистанция(км)")
    date_delivery = models.DateTimeField(verbose_name="Дата доставки", null=True, blank=True,)

    def __str__(self):
        return self.title
