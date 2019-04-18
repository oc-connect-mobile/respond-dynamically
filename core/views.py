from django.shortcuts import render
import json

# Our App imports:
from core.forms import PleaseSearchForm
from core.models import PleaseSearch
from simple_salesforce import SalesforceAPI
# Create your views here.


def index(request):
    """View function for home page of site."""
     
    # Render the HTML template index.html with the data in the context variable
    response = render(request, 'index.html', {
        # 'context variable': context variable,
    })
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
    json_data = open('core/static/json/sample.json')
    data1 = json.load(json_data) #deserializes it
    data2 = json.dumps(data1) #json formatting string
    print(data1["records"][1]["Name"])
    printable = data1["records"][1]["Name"]
    json_data.close()

    context = {
        'printable': printable,
        'records': data1['records']
    }

    return render(request, 'json-call.html', context=context)