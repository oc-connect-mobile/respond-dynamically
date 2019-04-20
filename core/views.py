from django.shortcuts import render
import json

# Our App imports:
from core.forms import PleaseSearchForm, CityFilterForm, CountyFilterForm, CategoryFilterForm
from core.models import PleaseSearch
from simple_salesforce import SalesforceAPI
from .super_salesforce import supersf
from pprint import pprint
from django.shortcuts import redirect
# Create your views here.


def index(request):
    """View function for home page of site."""
    q = "/services/data/v45.0/query?"
    a = "q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account"
    y= "+ORDER+BY+Website+DESC+NULLS+LAST+LIMIT+3"
    soqlkv = a+y
    b = "+WHERE+"
    x = "Deactivated__c=FALSE"
    cities = ""
    counties = ""
    categories = ""

    if request.method == 'GET':

        city_form = CityFilterForm(request.GET)
        c = "City_Served__c+includes("
        d = ")+AND+"
        if city_form.is_valid():
            cities = str(city_form.cleaned_data.get('Cities'))[1:-1]
            if 'Any city' in city_form.cleaned_data.get('Cities'):
                print ("Don't limit by city!")
                c = ""
                cities = "" 
                d = ""
        if 'clear' in request.GET:
            county_form = CountyFilterForm(request.GET)
            category_form = CategoryFilterForm(request.GET)
            city_form = CityFilterForm()

    
        
        county_form = CountyFilterForm(request.GET)
        g = "County_Served__c+includes("
        h = ")+AND+"    
        if county_form.is_valid():
            counties = str(county_form.cleaned_data.get('Counties'))[1:-1]
            if 'Any county' in county_form.cleaned_data.get('Counties'):
                print ("Don't limit by county!")
                g = ""
                counties = ""
                h = ""
        if 'clear' in request.GET:
            category_form = CategoryFilterForm(request.GET)
            city_form = CityFilterForm(request.GET)
            county_form = CountyFilterForm()
        
       

        category_form = CategoryFilterForm(request.GET)
        e = "CEF_Category__c+includes("
        f = ")+AND+"
        if category_form.is_valid():
            categories = str(category_form.cleaned_data.get('Categories'))[1:-1]
            if 'Any category' in category_form.cleaned_data.get('Categories'):
                print ("Don't limit by category!")
                e = ""
                categories = ""
                f = ""
        if 'clear' in request.GET:
            city_form = CityFilterForm(request.GET)
            county_form = CountyFilterForm(request.GET)
            category_form = CategoryFilterForm()
        
        soqlkv = a+y
        #soqlkv=(a+b+c+cities+d+e+categories+f+g+counties+h+x)

    data1 = supersf(soqlkv)
    pprint(data1)
    #printable = data1["records"][1]["Name"]

    context = {
        #'printable': printable,
        'records': data1,
        'county_form': county_form,
        'city_form': city_form,
        'category_form': category_form
        }   

    # Render the HTML template index.html with the data in the context variable
    response = render(request, 'index.html', context=context)
    return response


def city_search(request):
    
    if request.method == 'GET':
        city_form = PleaseSearchForm(request.GET)
        city_form.initial={'Cities': 'Any city'}
        
        
        if city_form.is_valid():
            # city = city_form.save(commit=False)
            cities = str(city_form.cleaned_data.get('Cities'))[1:-1]
            categories = str(city_form.cleaned_data.get('Categories'))[1:-1]
            counties = str(city_form.cleaned_data.get('Counties'))[1:-1]
            a = "/services/data/v45.0/query?q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account"
            b = "+WHERE+"
            c = "City_Served__c+includes("
            d = ")+AND+"
            e = "CEF_Category__c+includes("
            f = ")+AND+"
            g = "County_Served__c+includes("
            h = ")+AND+"
            x = "Deactivated__c=FALSE"


            if 'Any city' in city_form.cleaned_data.get('Cities'):
                print ("Don't limit by city!")
                c = ""
                cities = ""
                d = ""
            if 'Any category' in city_form.cleaned_data.get('Categories'):
                print ("Don't limit by category!")
                e = ""
                categories = ""
                f = ""
            if 'Any county' in city_form.cleaned_data.get('Counties'):
                print ("Don't limit by county!")
                g = ""
                counties = ""
                h = ""
 
            print(a+b+c+cities+d+e+categories+f+g+counties+h+x)
            #print(a+b+c+cities+d+e+categories+f+g+counties+h+x)
            print(cities, categories, counties)
            return render(request, 'city-search.html', {
                 'city_form': city_form,
            })
    
    

    else:
        city_form = PleaseSearchForm()
            
    return render(request, 'city-search.html', {
        'city_form': city_form,
    })

def json_call(request):
    soqlkv = 'q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c,+ID,+Secondary_Tags__c+FROM+Account+WHERE+Deactivated__c+=+FALSE+ORDER+BY+Website+DESC+NULLS+LAST'
    #+AND+CreatedDate>2019-04-15T00:00:00Z'
   
    data1 = supersf(soqlkv)
    pprint(data1["records"][1]["Name"])

    printable = data1["records"][1]["Name"]


    context = {
        'printable': printable,
        'records': data1['records']
    }

    return render(request, 'json-call.html', context=context)