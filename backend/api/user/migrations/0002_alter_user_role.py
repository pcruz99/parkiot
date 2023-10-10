# Generated by Django 4.2.2 on 2023-09-09 04:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api_user", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[("client", "client"), ("admin", "admin"), ("guard", "guard")],
                default="client",
                max_length=45,
            ),
        ),
    ]
