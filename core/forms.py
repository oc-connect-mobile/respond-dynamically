from django import forms
from .models import PleaseSearch

class PleaseSearchForm(forms.ModelForm):

    class Meta:
        model = PleaseSearch
        fields = ('city',
        )