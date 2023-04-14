# Generated by Django 4.2 on 2023-04-08 04:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LicensePlate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CarWashService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('service_date', models.DateField()),
                ('service_description', models.TextField(max_length=30)),
                ('license_plate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customers.licenseplate')),
            ],
        ),
    ]
