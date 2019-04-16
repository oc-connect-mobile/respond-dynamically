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

# class CityList

class PleaseSearch(models.Model):

    CITY_CHOICES = (
        ('Chapel Hill', 'Chapel Hill'),
        ('Durham', 'Durham'),
        ('Carrboro', 'Carrboro'),
        ('Hillsborough', 'Hillsborough'),
        ('Raleigh', 'Raleigh'),
        ('Mebane', 'Mebane'),
        ('Morrisville', 'Morrisville'),
        ('Bingham', 'Bingham'),
        ('Cedar Grove', 'Cedar Grove'),
        ('Eno', 'Eno'),
        ('Little River', 'Little River'),
    )
    
    city = models.CharField(max_length=25, choices=CITY_CHOICES)
    searched_at = models.DateTimeField(auto_now_add=True)
    query_string_start = models.CharField(max_length=100)
    query_string_end = models.CharField(max_length=100)
    sf_field = models.CharField(max_length=100)
    # citylist = models.ManyToManyField(Dog, related_name='events', blank=True)

    CATEGORY_CHOICES = (
        ('Emergency', 'Emergency'),
        ('Food', 'Food'),
        ('Housing', 'Housing'),
        ('Goods', 'Goods'),
        ('Transportation', 'Transportation'),
        ('Health', 'Health'),
        ('Finances', 'Finances'),
        ('Care', 'Care'),
        ('Education', 'Education'),
        ('Employment', 'Employment'),
        ('Legal', 'Legal'),
        ('Communication', 'Communication'),
        ('One Stop', 'One Stop'),
    )

    categories = models.CharField(max_length=25, choices=CATEGORY_CHOICES)

    COUNTY_CHOICES = (
        ('Durham', 'Durham'),
        ('Orange', 'Orange'),
        ('Wake', 'Wake'),
        ('Caswell', 'Caswell'),
        ('Alamance', 'Alamance'),
        ('Chatham', 'Chatham'),
        ('Person', 'Person'),
    )

    counties = models.CharField(max_length=25, choices=COUNTY_CHOICES)


    

