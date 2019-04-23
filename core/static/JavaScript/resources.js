let resources = data

function query(selector){
    return document.querySelector(selector)
}

function queryAll(selector){
    return document.querySelectorAll(selector)
}

document.addEventListener('DOMContentLoaded', function(){
    let idx
            for (idx = 0; idx < resources.records.length; idx++){
    const resourceList = query('.list-of-resources')
    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('div')
    const infoTag = document.createElement('span')
    const webTag = document.createElement('span')
    const phoneTag = document.createElement('span')
    const emailTag = document.createElement('span')
    const categoryTag = document.createElement('span')
    const descTag = document.createElement('p')
    const eligibiliyTag = document.createElement('span')
    const seeMoreTag = document.createElement('button')

    const resourceId = resources.records[idx]['Id']
    const resourceName = resources.records[idx].Name    
    const resourceWeb = resources.records[idx]['Website']
    const resourcePhone = resources.records[idx]['Imported_Phone__c']
    const resourceEmail = resources.records[idx]['Company_Email__c']
    const resourceCategory = resources.records[idx]['CEF_Category__c']
    const resourceDesc = resources.records[idx]['Description_Short__c']
    const resourceEligible = resources.records[idx]['Eligibility_Criteria__c']

    resourceTag.className = "listed-resource"
    infoTag.className = "info"
    nameTag.className = "listed-name"
    descTag.className = "listed-desc"
    webTag.className = "listed-site"
    phoneTag.className = "listed-phone"
    emailTag.className = "listed-email"
    categoryTag.className = "listed-site"
    eligibiliyTag.classList.add ("listed_criteria", "foo-button", "mdc-button")
    seeMoreTag.className = "listed-detail"

    nameTag.innerText = resourceName
    webTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
    phoneTag.innerHTML = `<a class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
    emailTag.innerHTML = `<a class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`
    categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="fa"></i> ${resourceCategory}</a>`
    descTag.innerText = resourceDesc
    eligibiliyTag.innerHTML = `R<i class="fa"></i>`
    seeMoreTag.innerHTML = `<a class="foo-button mdc-button" href="/json-data/${resourceId}">See more</a>`

    resourceList.appendChild(resourceTag)
    resourceTag.appendChild(nameTag) 
    resourceTag.appendChild(infoTag)
    infoTag.appendChild(categoryTag)
    infoTag.appendChild(webTag)
    infoTag.appendChild(phoneTag)
    infoTag.appendChild(emailTag)
    infoTag.appendChild(eligibiliyTag)
    resourceTag.appendChild(descTag)
    resourceTag.appendChild(seeMoreTag)

   }
})