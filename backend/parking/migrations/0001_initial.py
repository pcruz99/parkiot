# Generated by Django 4.2.2 on 2023-07-05 03:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Vehicle",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("brand", models.CharField(max_length=45, verbose_name="marca")),
                ("model", models.CharField(max_length=45, verbose_name="modelo")),
                ("color", models.CharField(max_length=45)),
                ("tipo", models.CharField(max_length=45)),
                ("placa", models.CharField(max_length=45, unique=True)),
                ("year", models.IntegerField(verbose_name="Año del Vehiculo")),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="dueño",
                    ),
                ),
            ],
        ),
    ]
