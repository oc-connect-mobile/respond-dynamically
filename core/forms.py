from django import forms
from .models import PleaseSearch

class PleaseSearchForm(forms.Form):

    class Meta:
        model = PleaseSearch
        
    Cities = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(attrs={'Any city': 'checked'}), choices = PleaseSearch.CITY_CHOICES, initial='Any city')
    Categories = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.CATEGORY_CHOICES, initial='Any category')
    Counties = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices = PleaseSearch.COUNTY_CHOICES, initial='Any county')
