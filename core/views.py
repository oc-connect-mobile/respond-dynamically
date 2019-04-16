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


def city_form(request):
    
    if request.method == 'GET':
        search_city_form = PleaseSearchForm(request.GET)
        
        
        if search_city_form.is_valid():
            city = search_city_form.save(commit=False)
            
            return redirect(deck.get_absolute_url())

    else:
        search_city_form = PleaseSearchForm
            
    return render(request, 'city-search.html', {
        'search_city_form': search_city_form,
    })