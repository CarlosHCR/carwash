# Generated by Django 4.2 on 2023-05-13 06:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0004_rename_servicetype_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='service_type',
            new_name='type',
        ),
    ]
