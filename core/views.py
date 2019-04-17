from django.shortcuts import render
import json

# Our App imports:
from core.forms import PleaseSearchForm
from core.models import PleaseSearch
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
        
        
        if city_form.is_valid():
            # city = city_form.save(commit=False)
            cities = str(city_form.cleaned_data.get('Cities'))[1:-1]
            start = "/services/data/v45.0/query?q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account+WHERE+City_Served__c+includes("
            middle = ")+AND+CEF_Category__c+includes("
            middle2 = ")+AND+County_Served__c+includes("
            end = ")+AND+Deactivated__c=FALSE"
            categories = str(city_form.cleaned_data.get('Categories'))[1:-1]
            counties = str(city_form.cleaned_data.get('Counties'))[1:-1]
            print(start, cities, middle, categories, middle2, counties, end)
            print(categories, counties)
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