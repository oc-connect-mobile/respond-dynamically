from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name='index'), 
   path('resource/<slug:id>', views.resource_detail, name='resouce-detail'),
   path('about/', views.about_page, name='about-page'),
]
   