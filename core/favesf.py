from super_salesforce import supersf
from pprint import pprint
from django.shortcuts import redirect



l = "parameterizedSearch/?q="
n = "&sobject=Account"
p = "&Account.fields=id"
r = "&Account.limit=3"

luckies = "Peace"

soqlkv = l+luckies+n+p+r

print("Milestone 1 : Print soqlkv")
print(soqlkv)

print("Milestone 2 : retrieve data1")
data1 = supersf(soqlkv)
pprint(data1)
print(data1)



print("Milestone 3")
data3 = (data1["searchRecords"])
pprint(data3)
print(type(data3))

print("Milestone 3.5")
data35 = []
for x in data3:
    for k,v in x.items():
        if type(v) == str:
            data35 += (k,v)
print(data35)
print(type(data35))
print(len(data35))
for i in data35:
    data35.remove('Id')
print(data35)

str = ""
for j in data35:
    str.join(j)
    print(len(j))
print(data35)


data36 = data35
data35[:] = ["id='"+x+"'+OR+" for x in data35]
print(data36)
data35.append("id='001U0000008jpEpIAI'")

print(data36)

str = ""
data37 = str.join(data36)
print(len(data37))
print(data37)


#id='001U0000008jpEpIAI'+=OR+id='001U000000YP8BzIAL'+=OR+id='0011B000028E19EQAS'+=OR+id='0000'

q = "query?"
a = "q=SELECT+Name,+Website,+Imported_Phone__c,+Company_Email__c,+Description_Short__c+FROM+Account"
b = "+WHERE+"

soqlkv = (q+a+b+data37)
print(soqlkv)

data40 = supersf(soqlkv)
pprint(data40)
print(data40)
