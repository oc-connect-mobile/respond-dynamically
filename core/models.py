from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Auth(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    token = models.CharField(max_length=100)


class PleaseSearch(models.Model):

    CITY_CHOICES = (
        ('CHAPELHILL', 'Chapel Hill'),
        ('DURHAMCITY', 'Durham'),
        ('CARRBORO', 'Carrboro'),
        ('HILLSBOROUGH', 'Hillsborough'),
        ('RALEIGH', 'Raleigh'),
        ('MEBANE', 'Mebane'),
        ('MORRISVILLE', 'Morrisville'),
        ('BINGHAM', 'Bingham'),
        ('CEDARGROVE', 'Cedar Grove'),
        ('ENO', 'Eno'),
        ('LITTLERIVER', 'Little River'),
    )

    city = models.CharField(max_length=25, choices=CITY_CHOICES)
    searched_at = models.DateTimeField(auto_now_add=True)
    query_string_start = models.CharField(max_length=100)
    query_string_end = models.CharField(max_length=100)
    sf_field = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.set_slug()
        super().save(*args, **kwargs)


