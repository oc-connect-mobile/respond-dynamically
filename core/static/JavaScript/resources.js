let resources = data

function query (selector) {
  return document.querySelector(selector)
}

function queryAll (selector) {
  return document.querySelectorAll(selector)
}

function separateCategory (catList) {
  if (catList === null) {
    return null
  }
  if (catList.includes(';')) {
    let List = catList.split(';')
    return List
  }
  return catList
}

function separateCity (cityList) {
  if (cityList === null) {
    return null
  }
  if (cityList.includes(';')) {
    let List = cityList.split(';')
    return List
  }
  return cityList
}

function populateList (resources) {
  let idx
  for (idx = 0; idx < resources.records.length; idx++) {
    const resourceList = query('.list-of-resources')
    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('div')
    const infoTag = document.createElement('span')
    const webTag = document.createElement('span')
    const phoneTag = document.createElement('span')
    const emailTag = document.createElement('span')
    const categoryList = document.createElement('div')
    const categoryTag = document.createElement('span')
    const descTag = document.createElement('p')
    const eligibiliyTag = document.createElement('span')
    const seeMoreTag = document.createElement('button')
    const cityServedTag = document.createElement('div')
    const cityServedList = document.createElement('div')

    const resourceId = resources.records[idx]['Id']
    const resourceName = resources.records[idx].Name
    const resourceWeb = resources.records[idx]['Website']
    const resourcePhone = resources.records[idx]['Imported_Phone__c']
    const resourceEmail = resources.records[idx]['Company_Email__c']
    const resourceCategory = resources.records[idx]['CEF_Category__c']
    const resourceDesc = resources.records[idx]['Description_Short__c']
    const resourceEligible = resources.records[idx]['Eligibility_Criteria__c']
    const resourceCity = resources.records[idx]['City_Served__c']

    resourceTag.className = 'listed-resource'
    infoTag.className = 'info'
    nameTag.className = 'listed-name'
    descTag.className = 'listed-desc'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
    emailTag.className = 'listed-email'
    categoryList.className = 'category-list'
    eligibiliyTag.classList.add('listed_criteria', 'foo-button', 'mdc-button')
    seeMoreTag.className = 'listed-detail'
    cityServedTag.className = 'city-list'

    nameTag.innerText = resourceName
    webTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
    phoneTag.innerHTML = `<a class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
    emailTag.innerHTML = `<a class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`

    let cityList = separateCity(resourceCity)
    if (cityList !== null) {
      if (typeof cityList === 'object') {
        let listLength = cityList.length
        for (let i = 0; i < listLength; i++) {
          let cityServedTag = document.createElement('span')
          let city = cityList[i].replace(' ', '')
          cityServedTag.classList.add('listed-city', (`${city}`))
          cityServedTag.setAttribute('style', 'display:hidden')
          cityServedList.appendChild(cityServedTag)
        }
      }
      if (typeof cityList === 'string') {
        let city = cityList.replace(' ', '')
        cityServedTag.classList.add('listed-city', (`${city}`))
        cityServedTag.setAttribute('style', 'display:hidden')
        cityServedList.appendChild(cityServedTag)
      }
    }
    cityServedList.setAttribute('style', 'display:hidden')

    let catList = separateCategory(resourceCategory)
    if (catList !== null) {
      if (typeof catList === 'object') {
        let listLength = catList.length
        for (let i = 0; i < listLength; i++) {
          let categoryTag = document.createElement('span')
          let cat = catList[i].replace(' ', '')
          categoryTag.innerText = catList[i]
          categoryTag.classList.add('listed-cat', (`${cat}`))
          categoryList.appendChild(categoryTag)
        }
      }
      if (typeof catList === 'string') {
        let cat = catList.replace(' ', '')
        categoryTag.innerText = catList
        categoryTag.classList.add('listed-cat', (`${cat}`))
        categoryList.appendChild(categoryTag)
      }
    }

    descTag.innerText = resourceDesc
    if (resourceEligible !== null) {
      eligibiliyTag.innerHTML = `R<i class="fa"></i>`
    }
    seeMoreTag.innerHTML = `<a class="foo-button mdc-button" href="/resource/${resourceId}">See more</a>`

    nameTag.innerText = resourceName
    webTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
    phoneTag.innerHTML = `<a class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
    emailTag.innerHTML = `<a class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`

    if (resourceCategory != null) {
      if (resourceCategory.indexOf('Emergency') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-emergency" aria-label="Emergency" aria-hidden="true">error</i></i></a>`
      }
      if (resourceCategory.indexOf('Food') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-food" aria-label="Food" aria-hidden="true">local_dining</i></i></a>`
      }
      if (resourceCategory.indexOf('Housing') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-housing" aria-label="Housing" aria-hidden="true">local_hotel</i></i></a>`
      }
      if (resourceCategory.indexOf('Goods') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-goods" aria-label="Goods" aria-hidden="true">shopping_basket</i></i></a>`
      }
      if (resourceCategory.indexOf('Transportation') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-transportation" aria-label="Transporation" aria-hidden="true">commute</i></i></a>`
      }
      if (resourceCategory.indexOf('Health') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-health" aria-label="Health" aria-hidden="true">local_hospital</i></i></a>`
      }
      if (resourceCategory.indexOf('Finances') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-finances" aria-label="Finances" aria-hidden="true">account_balance</i></i></a>`
      }
      if (resourceCategory.indexOf('Care') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-care" aria-label="Care" aria-hidden="true">accessibility_new</i></i></a>`
      }
      if (resourceCategory.indexOf('Education') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-education" aria-label="Education" aria-hidden="true">school</i></i></a>`
      }
      if (resourceCategory.indexOf('Employment') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-employment" aria-label="Employment" aria-hidden="true">business_center</i></i></a>`
      }
      if (resourceCategory.indexOf('Legal') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-legal" aria-label="Legal" aria-hidden="true">local_hospital</i></i></a>`
      }
      if (resourceCategory.indexOf('Communication') >= 0) {
        categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="material-icons i-communication" aria-label="Communication" aria-hidden="true">feedback</i></i></a>`
      }
    } else { categoryTag.innerHTML = `<a class="foo-button mdc-button" href="${resourceCategory}"><i class="fa"></i> ${resourceCategory}</a>` }

    descTag.innerText = resourceDesc
    eligibiliyTag.innerHTML = `R<i class="fa"></i>`
    seeMoreTag.innerHTML = `<a class="foo-button mdc-button" href="/json-data/${resourceId}">See more</a>`

    resourceList.appendChild(resourceTag)
    resourceTag.appendChild(nameTag)
    resourceTag.appendChild(infoTag)
    infoTag.appendChild(categoryList)
    infoTag.appendChild(cityServedList)
    infoTag.appendChild(webTag)
    infoTag.appendChild(phoneTag)
    infoTag.appendChild(emailTag)
    infoTag.appendChild(eligibiliyTag)
    resourceTag.appendChild(descTag)
    resourceTag.appendChild(seeMoreTag)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  populateList(resources)
})
