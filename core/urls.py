from django.urls import path
from . import views

urlpatterns = [
   path('', views.index, name='index'), 
   path('city-search/', views.city_search, name='city-search'),
   path('json-data/', views.json_call, name='json-data'),
   path('resource/<slug:id>', views.resource_detail, name='resouce-detail'),
]
   