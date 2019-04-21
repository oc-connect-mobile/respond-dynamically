from django.shortcuts import render
import json

# Our App imports:
from core.forms import PleaseSearchForm, CityFilterForm, CountyFilterForm, CategoryFilterForm, SecondaryFilterForm, LuckySearchForm
from core.models import PleaseSearch, LuckySearch
from simple_salesforce import SalesforceAPI
from .super_salesforce import supersf
from pprint import pprint
from django.shortcuts import redirect
# Create your views here.


def index(request):
    """View function for home page of site."""
    """ url = "/services/data/v45.0/ """
    q = "query?"
    a = "q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account"
    b = "+WHERE+"
    
    x = ")+AND+" 
    y = "Deactivated__c=FALSE"
    z= "+ORDER+BY+Website+ASC+NULLS+LAST+LIMIT+3"

    counties = "'Any county'"
    

    
    # counties = county_form.cleaned_data.get('Counties')
    # cities = city_form.cleaned_data.get('Cities')
    # categories = category_form.cleaned_data.get('Categories')
    # secondaries = secondary_form.cleaned_data.get('Secondaries')

    # print(counties)
    # print(cities)
    # print(categories)
    # print(secondaries)

    #if 'Any category' in category_form.cleaned_data.get('Categories') or category_form.cleaned_data.get('Categories') == None:

    g = ""
    h = ""
    c = ""
    d = ""
    e = ""
    f = ""
    j = ""
    k = ""

    if request.method == 'GET':

        
        #cities = "'Any+city'"
        #categories = "'Any+category'"
        #secondaries = "'Any+secondary'"

        initial_county = {'Counties': ['Any county'],
                            'Any county': True}
        county_form = CountyFilterForm(request.GET,initial=initial_county) 
        county_form.fields['Counties'].initial = ['Any county']
        if county_form.is_valid():
            if county_form.fields['Counties'] == None:
                counties = "'Any county'"
            else:     
                g = "County_Served__c+includes("
                counties = str(county_form.cleaned_data.get('Counties'))[1:-1].replace(" ","+")
                h = ")+AND+" 
            


            #if 'Any county' in county_form.cleaned_data.get('Categories') or county_form.cleaned_data.get('Categories') == []:
                
            #if 'clear' in request.GET:
                #category_form = CategoryFilterForm(request.GET)
                #city_form = CityFilterForm(request.GET)
                #county_form = CountyFilterForm()
            

        city_form = CityFilterForm(request.GET)
        if city_form.is_valid():
            c = "City_Served__c+includes("
            cities = str(city_form.cleaned_data.get('Cities'))[1:-1].replace(" ","+")
            d = ")+AND+"
            #if 'clear' in request.GET:
                #county_form = CountyFilterForm(request.GET)
                #category_form = CategoryFilterForm(request.GET)
                #city_form = CityFilterForm()

       
        category_form = CategoryFilterForm(request.GET)
        if category_form.is_valid():
            e = "CEF_Category__c+includes("
            categories = str(category_form.cleaned_data.get('Categories'))[1:-1].replace(" ","+")
            f = ")+AND+"
            #if 'clear' in request.GET:
                #city_form = CityFilterForm(request.GET)
                #county_form = CountyFilterForm(request.GET)
                #category_form = CategoryFilterForm()
        
        secondary_form = SecondaryFilterForm(request.GET)
        if secondary_form.is_valid():
            j = "Secondary_Tags__c+includes("
            secondaries = str(secondary_form.cleaned_data.get('Secondaries'))[1:-1].replace(" ","+")
            k = ")+AND+"
            #if 'clear' in request.GET:
                #city_form = CityFilterForm(request.GET)
                #county_form = CountyFilterForm(request.GET)
                #secondary_form = SecondaryFilterForm()

        lucky_form = LuckySearchForm(request.GET)
        l = "parameterizedSearch/?q="
        n = "&sobject=Account"
        p = "&Account.fields=id,name"
        r = "&Account.limit=5"
        if lucky_form.is_valid():
            luckies = str(lucky_form.cleaned_data.get('Luckies'))
            # limit = lucky_form.cleaned_data.get('Limit')
            # if limit == False:
            #     p = ""
            # print("This is p: "+p)
               
        #soqlkv = l+luckies+n+p+r
        #soqlkv=(q+a+z)
        #soqlkv = "query?q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account+WHERE+County_Served__c+includes('Orange',+'Chatham')+AND+Deactivated__c=FALSE+ORDER+BY+Website+ASC+NULLS+LAST+LIMIT+3"
        #soqlkv=(q+a+b+g+counties+x+y+z)
        soqlkv=(q+a+b+g+counties+h+c+cities+x+y+z)
        #c+cities+d+e+categories+f++j+secondaries+k

        print("county: ",county_form.cleaned_data.get('Counties'))
        print("city: ",city_form.cleaned_data.get('Cities'))
        print("category: ",category_form.cleaned_data.get('Categories'))
        print("secondary: ",secondary_form.cleaned_data.get('Secondaries'))

    print(soqlkv)

    data1 = supersf(soqlkv)
    pprint(data1)
    #printable = data1["records"][1]["Name"]

    

    context = {
        #'printable': printable,
        'records': data1,
        'county_form': county_form,
        'city_form': city_form,
        'category_form': category_form,
        'secondary_form': secondary_form,
        'lucky_form': lucky_form
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