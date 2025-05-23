# Generated by Django 5.2 on 2025-05-06 12:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DeliveryStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TypesOfPackaging',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Наименование заказа')),
                ('transport_models', models.CharField(max_length=100, verbose_name='Модель транспорта')),
                ('types_of_cargo', models.CharField(max_length=100, verbose_name='Тип груза')),
                ('distance', models.PositiveSmallIntegerField(verbose_name='Дистанция(км)')),
                ('date_delivery', models.DateTimeField(blank=True, null=True, verbose_name='Дата доставки')),
                ('delivery_status', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='status_delivery', to='delivery.deliverystatus', verbose_name='Статус доставки')),
                ('services', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_delivery', to='delivery.services', verbose_name='Услуга')),
                ('types_of_packaging', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='top_delivery', to='delivery.typesofpackaging', verbose_name='Тип упаковки')),
            ],
        ),
    ]
