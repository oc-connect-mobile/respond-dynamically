from django import forms
from .models import PleaseSearch
#from .models import LuckySearch

class PleaseSearchForm(forms.Form):

    class Meta:
        model = PleaseSearch
        
    Cities = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(attrs={'Any city': 'checked'}), choices = PleaseSearch.CITY_CHOICES, initial='Any city',)
    Categories = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.CATEGORY_CHOICES, initial='Any category')
    Counties = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices = PleaseSearch.COUNTY_CHOICES, initial='Any county')



class CountyFilterForm(forms.Form):

    Counties = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices = PleaseSearch.COUNTY_CHOICES, initial='Any county',required=False,label="Filter by county")

    class Meta:
        model = PleaseSearch
    
    
       
           

class CityFilterForm(forms.Form):
        
    Cities = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(attrs={'Any city': 'checked'}), choices = PleaseSearch.CITY_CHOICES, initial='Any city',required=False,label="Filter by city")

    class Meta:
        model = PleaseSearch

class CategoryFilterForm(forms.Form):

    Categories = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.CATEGORY_CHOICES,required=False,label="Filter by category")

    class Meta:
        model = PleaseSearch

class SecondaryFilterForm(forms.Form):

    Secondaries = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.SECONDARY_CHOICES, required=False,label="Filter by secondary category")

    class Meta:
        model = PleaseSearch

# class LuckySearchForm(forms.Form):

#     Luckies = forms.CharField(widget=forms.TextInput, required=False)
#     Limit = forms.CheckboxInput()

#     class Meta:
#         model = LuckySearch
    
