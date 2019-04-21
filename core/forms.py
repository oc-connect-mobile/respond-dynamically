from django import forms
from .models import PleaseSearch
from .super_salesforce import supersf

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

    def __init__(self, *args, **kwargs):
        super(CountyFilterForm, self).__init__(*args, **kwargs)
        self.fields['Counties'].initial = ['Any county']

    def ingest(self):
        j = "County_Served__c+includes("
        k = "'Any+county'"
        l = ")+AND+"
        if not self.is_valid():
            return m
        counties = str(self.cleaned_data['Counties']).replace("[","").replace("]","").replace(" ","+")
        if counties == "":
            m = ""
        else:
            m = j+counties+l
        return m
        
       

class CityFilterForm(forms.Form):
        
    Cities = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple(attrs={'Any city': 'checked'}), choices = PleaseSearch.CITY_CHOICES, initial='Any city',required=False,label="Filter by city")

    class Meta:
        model = PleaseSearch

    def __init__(self, *args, **kwargs):
        super(CityFilterForm, self).__init__(*args, **kwargs)
        self.fields['Cities'].initial = ['Any city']

    def ingest(self):
        j = "City_Served__c+includes("
        k = "'Any+city'"
        l = ")+AND+"
        if not self.is_valid():
            return m
        cities = str(self.cleaned_data['Cities']).replace("[","").replace("]","").replace(" ","+")
        if cities == "":
            m = ""
        else:
            m = j+cities+l
        return m

class CategoryFilterForm(forms.Form):

    Categories = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.CATEGORY_CHOICES,required=False,label="Filter by category")

    class Meta:
        model = PleaseSearch

    def __init__(self, *args, **kwargs):
        super(CategoryFilterForm, self).__init__(*args, **kwargs)
        self.fields['Categories'].initial = ['Any category']

    def ingest(self):
        j = "CEF_Category__c+includes("
        k = "'Any+category'"
        l = ")+AND+"
        m = j+k+l
        if not self.is_valid():
            return m
        categories = str(self.cleaned_data['Categories']).replace("[","").replace("]","").replace(" ","+")
        if categories == "":
            m = ""
        else:
            m = j+categories+l
        return m

class SecondaryFilterForm(forms.Form):

    Secondaries = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices =  PleaseSearch.SECONDARY_CHOICES, required=False,label="Filter by secondary category")

    class Meta:
        model = PleaseSearch

    def __init__(self, *args, **kwargs):
        super(SecondaryFilterForm, self).__init__(*args, **kwargs)
        self.fields['Secondaries'].initial = ['Any secondary']

    def ingest(self):
        j = "County_Served__c+includes("
        k = "'Any+secondary'"
        l = ")+AND+"
        m = j+k+l
        if not self.is_valid():
            return m   
        secondaries = str(self.cleaned_data['Secondaries']).replace("[","").replace("]","").replace(" ","+")
        if secondaries == "":
            m = ""
        else:
            m = j+secondaries+l
        return m

class LuckySearchForm(forms.Form):

    Luckies = forms.CharField(widget=forms.TextInput, required=False)

    class Meta:
        model = PleaseSearch

    def __init__(self, *args, **kwargs):
        super(LuckySearchForm, self).__init__(*args, **kwargs)

    def ingest(self):
        r = "parameterizedSearch/?q="
        s = "&sobject=Account"
        t = "&Account.fields=id"
        p = "+AND+"
        
        if not self.is_valid():
            return m   
        luckies = self.cleaned_data['Luckies']
        if luckies == "":
            v = ""
        else:
            soqlkv = r+luckies+s+t
            data1 = supersf(soqlkv)
            data3 = (data1["searchRecords"])
            data4 = []
            for x in data3:
                for k,v in x.items():
                    if type(v) == "str":
                        data4 += (k,v)
            for i in data4:
                data4.remove('Id')
            data5 = data4
            data4[:] = ["id='"+x+"'+OR+" for x in data4]    
            data5.append("id='001U0000008jpEpIAI'")
            str = ""
            v = str.join(data5)+p
        return v



