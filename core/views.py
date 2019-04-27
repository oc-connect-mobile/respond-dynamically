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
from django import forms

# Create your views here.


def index(request):
    """View function for home page of site."""
    """ url = "/services/data/v45.0/" """
    a = "query?q=SELECT+ID,+Name,+CEF_Category__c,+County_Served__c,+City_Served__c,+Website,+Eligibility_Criteria__c,+CEF_Sub_Category__c,+Secondary_Tags__c,+Imported_Phone__c,+Company_Email__c,+Description_Short__c,Primary_City__c+FROM+Account"
    b = "+WHERE+"
    x = "Deactivated__c=FALSE"
    y= "+ORDER+BY+Website"
    #+NULLS+LAST+LIMIT+3"

    r = "parameterizedSearch/?q="
    s = "&sobject=Account"
    q = ""
    t = "&Account.fields=id"
    #&Account.limit=2"
    p = ")+AND+"

    data9 = []
    soqlkv = a+b+x+y


    if request.method == 'GET':
        if request.GET.get('luckyq'):
            q = request.GET.get('luckyq')
            soqlkv = r+q+s+t
            data1 = supersf(soqlkv)
            data3 = (data1["searchRecords"])
            data4 = []
            for j in data3:
                for k,v in j.items():
                    if type(v) == str:
                        data4 += (k,v)
            for i in data4:
                data4.remove('Id')
            data5 = data4
            data4[:] = ["id='"+j+"'+OR+" for j in data4]    
            data5.append("id='0012100000gHwtGAAS'")
            # data5.append("id='001U0000008jpEpIAI'")
            string = ""
            u = string.join(data5)
            v = "("+u+p
            soqlkv = a+b+v+x+y
            # data9 = json.dumps(data3)
            # return data9
        if request.GET.get('clear'):
            print("clear")
            soqlkv = a+b+x+y
    
    data1 = supersf(soqlkv)
    data2 = json.dumps(data1)
    # records = data1['records'] # this is now a list
    # print(data2)


    context = {
        'data2': data2,
        'data1': data1,
        # 'data9': data9,
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