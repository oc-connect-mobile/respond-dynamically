# Generated by Django 2.2 on 2019-04-16 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pleasesearch',
            name='city',
            field=models.CharField(choices=[('Chapel Hill', 'Chapel Hill'), ('Durham', 'Durham'), ('Carrboro', 'Carrboro'), ('Hillsborough', 'Hillsborough'), ('Raleigh', 'Raleigh'), ('Mebane', 'Mebane'), ('Morrisville', 'Morrisville'), ('Bingham', 'Bingham'), ('Cedar Grove', 'Cedar Grove'), ('Eno', 'Eno'), ('Little River', 'Little River')], max_length=25),
        ),
    ]
