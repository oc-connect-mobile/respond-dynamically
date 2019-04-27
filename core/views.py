from django.shortcuts import render
import json
from django.core.paginator import Paginator

# Our App imports:
from core.forms import PleaseSearchForm, CityFilterForm, CountyFilterForm, CategoryFilterForm, SecondaryFilterForm, LuckySearchForm
from core.models import PleaseSearch, LuckySearch
from simple_salesforce import SalesforceAPI
from .super_salesforce import supersf

from pprint import pprint
from django.shortcuts import redirect

from .super_detail_salesforce import superDetailsf

# Create your views here.


def index(request):
    """View function for home page of site."""
    """ url = "/services/data/v45.0/" """
    a = "query?q=SELECT+ID,+Name,+CEF_Category__c,+County_Served__c,+City_Served__c,+Website,+Eligibility_Criteria__c,+CEF_Sub_Category__c,+Secondary_Tags__c,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account"
    b = "+WHERE+"
    x = "Deactivated__c=FALSE"
    y= "+ORDER+BY+Website+NULLS+LAST"
    #+LIMIT+3"

    if request.method == 'GET':
       
        city_form = CityFilterForm(request.GET)
        if city_form.is_valid():
            city_string = city_form.ingest()
            print("printing city string")
            print(city_string)

        #if 'clear' in request.GET:
            #county_form = CountyFilterForm(request.GET)
            #category_form = CategoryFilterForm(request.GET)
            #city_form = CityFilterForm()
        
        county_form = CountyFilterForm(request.GET)
        if county_form.is_valid():
                county_string = county_form.ingest()
                print("printing county string")
                print(county_string)
        
        # if 'clear' in request.GET:
        #     #category_form = CategoryFilterForm(request.GET)
        #     #city_form = CityFilterForm(request.GET)
        #     county_form = CountyFilterForm()    

        category_form = CategoryFilterForm(request.GET)
        if category_form.is_valid():
            category_string = category_form.ingest()
            print("printing category string")
            print(category_string)

        #if 'clear' in request.GET:
            #city_form = CityFilterForm(request.GET)
            #county_form = CountyFilterForm(request.GET)
            #category_form = CategoryFilterForm()
        
        secondary_form = SecondaryFilterForm(request.GET)
        if secondary_form.is_valid():
            secondary_string = secondary_form.ingest()
            print("printing secondary string")
            print(secondary_string)

        #if 'clear' in request.GET:
            #city_form = CityFilterForm(request.GET)
            #county_form = CountyFilterForm(request.GET)
            #secondary_form = SecondaryFilterForm()

        lucky_form = LuckySearchForm(request.GET)
        if lucky_form.is_valid():
            lucky_string = lucky_form.ingest()
            print("printing lucky string")
            print(lucky_string)


        
        soqlkv = a+b+county_string+city_string+category_string+secondary_string+lucky_string+x+y
        

    data1 = supersf(soqlkv)
    data2 = json.dumps(data1)
    records = data1['records'] # this is now a list
    # print(data2)
    
#printable = data1["records"][1]["Name"]



    context = {
        'data2': data2,
        'data1': data1,
        'records': records,
        'county_form': county_form,
        'city_form': city_form,
        'category_form': category_form,
        'secondary_form': secondary_form,
        'lucky_form': lucky_form
        }   

    # Render the HTML template index.html with the data in the context variable
    response = render(request, 'index.html', context=context)
    return response

def resource_detail(request, id):
    soqlkv = id

    detail1 = superDetailsf(soqlkv)
    data2 = json.dumps(detail1)
    
    pprint(data2)
    # attributes = data2['attributes']

    context = {
        'details': detail1,
        'data2': data2,
        # 'attributes': attributes,
    }
    return render(request, 'resource-detail.html', context=context)