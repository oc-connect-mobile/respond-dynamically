from django.shortcuts import render

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
            print(PleaseSearch.CITY_CHOICES)
            
            return render(request, 'city-search.html', {
                 'city_form': city_form,
            })

    else:
        city_form = PleaseSearchForm()
            
    return render(request, 'city-search.html', {
        'city_form': city_form,
    })