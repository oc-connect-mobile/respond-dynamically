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
        ('Any city', 'Any city'),
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
    
    city = models.CharField(max_length=100, choices=CITY_CHOICES)
    searched_at = models.DateTimeField(auto_now_add=True)
    query_string_start = models.CharField(max_length=100)
    query_string_end = models.CharField(max_length=100)
    sf_field = models.CharField(max_length=100)
    total_search_record = models.CharField(max_length=750, default="none")
    city_search_record = models.CharField(max_length=500, default="none")

    CATEGORY_CHOICES = (
        ('Any category', 'Any category'),
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

    categories = models.CharField(max_length=100, choices=CATEGORY_CHOICES, null=False)
    category_search_record = models.CharField(max_length=500, default="none")

    COUNTY_CHOICES = (
        ('Any county', 'Any county'),
        ('Durham', 'Durham'),
        ('Orange', 'Orange'),
        ('Wake', 'Wake'),
        ('Caswell', 'Caswell'),
        ('Alamance', 'Alamance'),
        ('Chatham', 'Chatham'),
        ('Person', 'Person'),
    )

    counties = models.CharField(max_length=200, choices=COUNTY_CHOICES, null=False, default=['Any county'])
    county_search_record = models.CharField(max_length=500, default="none")

    SECONDARY_CHOICES = (
        ('Any secondary', 'Any secondary'),
        ('Addiction & Recovery', 'Addiction & Recovery'),
        ('Adult Daycare', 'Adult Daycare'),
        ('Advocacy & Legal Aid', 'Advocacy & Legal Aid'),
        ('Affordable Housing', 'Affordable Housing'),
        ('Alternative Medicine', 'Alternative Medicine'),
        ('Assisted Living', 'Assisted Living'),
        ('Baby Supplies', 'Baby Supplies'),
        ('Birth Control', 'Birth Control'),
        ('Blankets & Fans', 'Blankets & Fans'),
        ('Books', 'Books'),
        ('Bus Passes', 'Bus Passes'),
        ('Busses', 'Busses'),
        ('Checkup & Test', 'Checkup & Test'),
        ('Childcare', 'Childcare'),
        ('Clothes for School', 'Clothes for School'),
        ('Clothing', 'Clothing'),
        ('Computer Class', 'Computer Class'),
        ('Counseling', 'Counseling'),
        ('Credit Counseling', 'Credit Counseling'),
        ('Dental Care', 'Dental Care'),
        ('Diapers &', 'Diapers &'),
        ('Disaster Response', 'Disaster Response'),
        ('Discounted Healthcare', 'Discounted Healthcare'),
        ('Domestic Violence Issues', 'Domestic Violence Issues'),
        ('Emergency Food', 'Emergency Food'),
        ('Emergency Money', 'Emergency Money'),
        ('Emergency Shelter', 'Emergency Shelter'),
        ('English as a Second Language (ESL)', 'English as a Second Language (ESL)'),
        ('Financial Assistance', 'Financial Assistance'),
        ('Financial Education', 'Financial Education'),
        ('Flood Relief', 'Flood Relief'),
        ('Food Pantry', 'Food Pantry'),
        ('Foreign Languages', 'Foreign Languages'),
        ('Free Meals', 'Free Meals'),
        ('Furniture', 'Furniture'),
        ('GED/High-School Equivalency', 'GED/High-School Equivalency'),
        ('Health Educ', 'Health Educ'),
        ('Health Education', 'Health Education'),
        ('Help Escape Violence', 'Help Escape Violence'),
        ('Help Fill out Forms', 'Help Fill out Forms'),
        ('Help Find Chi', 'Help Find Chi'),
        ('Help Find Housing', 'Help Find Housing'),
        ('Help Find Work', 'Help Find Work'),
        ('Help Hotlines', 'Help Hotlines'),
        ('Help Pay for Childcare', 'Help Pay for Childcare'),
        ('Help Pay for Healthcare', 'Help Pay for Healthcare'),
        ('Help Pay for Housing', 'Help Pay for Housing'),
        ('Help Pay for Rent', 'Help Pay for Rent'),
        ('Help Pay for School', 'Help Pay for School'),
        ('Help Pay for Utilities', 'Help Pay for Utilities'),
        ('Help Pay for Vehicles', 'Help Pay for Vehicles'),
        ('Home Goods', 'Home Goods'),
        ('Homebuyer Education', 'Homebuyer Education'),
        ('Housing Advice', 'Housing Advice'),
        ('Housing Relief', 'Housing Relief'),
        ('Immediate Safety', 'Immediate Safety'),
        ('Independent Living', 'Independent Living'),
        ('Insurance', 'Insurance'),
        ('Long-Term Housing', 'Long-Term Housing'),
        ('Maternity Care', 'Maternity Care'),
        ('Medical Care', 'Medical Care'),
        ('Medical Supplies', 'Medical Supplies'),
        ('Mental Health', 'Mental Health'),
        ('Mentoring', 'Mentoring'),
        ('Money Management', 'Money Management'),
        ('Navigating the System', 'Navigating the System'),
        ('Nursing Home', 'Nursing Home'),
        ('Nutrition', 'Nutrition'),
        ('Outpatient Treatment', 'Outpatient Treatment'),
        ('Personal Care Items', 'Personal Care Items'),
        ('Personal Hygiene', 'Personal Hygiene'),
        ('Prescription Assistance', 'Prescription Assistance'),
        ('Prevent & Treat', 'Prevent & Treat'),
        ('Primary Care', 'Primary Care'),
        ('Psychiatric Emergency', 'Psychiatric Emergency'),
        ('Public Housing', 'Public Housing'),
        ('Representation', 'Representation'),
        ('Resume Development', 'Resume Development'),
        ('Screening & Exams', 'Screening & Exams'),
        ('Skills & Training', 'Skills & Training'),
        ('Specialized Ther', 'Specialized Ther'),
        ('Specialized Training', 'Specialized Training'),
        ('Supplies for Work', 'Supplies for Work'),
        ('Support Group', 'Support Group'),
        ('Support Network', 'Support Network'),
        ('Tax Preparation', 'Tax Preparation'),
        ('Toys & Gift', 'Toys & Gift'),
        ('Transportation', 'Transportation'),
        ('Virtual Support', 'Virtual Support'),
        ('Vision Care', 'Vision Care'),
        ('Vision Tests', 'Vision Tests'),
        ('Workplace Rights', 'Workplace Rights'),
    )

    secondaries = models.CharField(max_length=300, choices=SECONDARY_CHOICES, default="none")
    secondary_search_record = models.CharField(max_length=500, default="none")

class LuckySearch(models.Model):
    lucky_string = models.CharField(max_length=100)
    searched_at = models.DateTimeField(auto_now_add=True)
    limit_by_name = models.BooleanField(default="True")


