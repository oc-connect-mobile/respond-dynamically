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
# from django import forms

# Create your views here.


def index(request):
    """View function for home page of site."""
    """ url = "/services/data/v45.0/" """
    a = "query?q=SELECT+ID,+Name,+CEF_Category__c,+County_Served__c,+City_Served__c,+Website,+Eligibility_Criteria__c,+CEF_Sub_Category__c,+Secondary_Tags__c,+Imported_Phone__c,+Company_Email__c,+Description_Short__c,Primary_City__c+FROM+Account"
    b = "+WHERE+"
    x = "Deactivated__c=FALSE"
    y= "+ORDER+BY+Website+NULLS+LAST"
    #+NULLS+LAST+LIMIT+3"
    
    soqlkv = a+b+x+y

    data1 = supersf(soqlkv)
    data2 = json.dumps(data1)
    # print(data2)

    context = {
        'data2': data2,
        'data1': data1,

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

def about_page(request):

    response = render(request, 'about.html')
    return response