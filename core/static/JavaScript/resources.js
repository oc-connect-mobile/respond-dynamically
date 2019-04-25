let resources = data

function query (selector) {
  return document.querySelector(selector)
}

function queryAll (selector) {
  return document.querySelectorAll(selector)
}
   
function toJoinTitleCaseWords(str) {
    let lowerInput = str.toLowerCase()
    lowerInput = lowerInput.split(' ')
    let upperInput = []
    let wordJoin = ''
    for (let idx = 0; idx < lowerInput.length; idx++){
        wordJoin += lowerInput[idx].charAt(0).toUpperCase()+lowerInput[idx].slice(1)
    }
    upperInput.push(wordJoin)
    return upperInput
}

function toTitleCase(str) {
	str = str.toLowerCase().split(' ')
	for (let i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
	}
	return str.join(' ')
}

function searchAny (input, modifiedInput, resources) {
    let allCats = getAllCategories(resources)
    let allCities = getAllCities(resources)
    let allSubCats = getAllSubCategories(resources)
    let allSecondaryTags = getAllSecondaryTags(resources)
    if (modifiedInput.some(v=> allCats.indexOf(v) !== -1) || modifiedInput.some(v=> allCities.indexOf(v) !== -1) || modifiedInput.some(v=> allSubCats.indexOf(v) !== -1) || modifiedInput.some(v=> allSecondaryTags.indexOf(v) !== -1)){
        updateList(input)
    }  
}   

function updateList (input) {
  const resourcesList = query('.list-of-resources')
  resourcesList.innerHTML = ''
  resources = data
  let counter = 0
  for (idx = 0; idx < resources.records.length; idx++) {
    cityTest = resources.records[idx]['City_Served__c']
    categoryTest = resources.records[idx]['CEF_Category__c']
    subCatTest = resources.records[idx]['CEF_Sub_Category__c']
    secondTagTest = resources.records[idx]['Secondary_Tags__c']
    if (cityTest === null && categoryTest === null && subCatTest === null && secondTagTest === null ){
      continue
    }
    if ((cityTest !== null && categoryTest !== null && subCatTest !== null && secondTagTest !== null) && (cityTest.includes(input) || categoryTest.includes(input) || subCatTest.includes(input) || secondTagTest.includes(input))) {
      populateList(resources, idx)
      counter += 1
    } else if (cityTest !== null && cityTest.includes(input)) {
      populateList(resources, idx)
      counter += 1
    } else if (categoryTest !== null && categoryTest.includes(input)) {
      populateList(resources, idx)
      counter += 1
    }
     else if (subCatTest !== null && subCatTest.includes(input)) {  
      populateList(resources, idx)
      counter += 1
    }
     else if (secondTagTest !== null && secondTagTest.includes(input)) {
      populateList(resources, idx)
      counter += 1
    }
  }
  console.log(counter)
}

function getAllCategories (resources){
    let allCategories = []
    for (idx = 0; idx < resources.records.length; idx++){
        const resourceCategory = resources.records[idx]['CEF_Category__c']
        if (resourceCategory !== null){
            let separatedCats = separateList(resourceCategory)
            if (typeof separatedCats === 'object') {
                let listLength = separatedCats.length
                for (let i = 0; i < listLength; i++) {
                    let category = separatedCats[i].replace(' ', '')
                    if (!allCategories.includes(category)){
                        allCategories.push(category)
                    }   
                }
            }
            if (typeof separatedCats === 'string') {
                let category = separatedCats.replace(' ', '')
                if (!allCategories.includes(category)){
                    allCategories.push(category)
                }
            } 
        }
    }
    return allCategories
}

function getAllCities (resources){
    let allCities = []
    for (idx = 0; idx < resources.records.length; idx++){
        const resourceCity = resources.records[idx]['City_Served__c']
        if (resourceCity !== null){
            let separatedCity = separateList(resourceCity)
            if (typeof separatedCity === 'object') {
                let listLength = separatedCity.length
                for (let i = 0; i < listLength; i++) {
                    let city = separatedCity[i].replace(' ', '')
                    if (!allCities.includes(city)){
                        allCities.push(city)
                    }
                }
            }
            if (typeof separatedCity === 'string') {
                let city = separatedCity.replace(' ', '')
                if (!allCities.includes(city)){
                    allCities.push(city)
                }
            } 
        }
    }
    return allCities
}

function getAllSubCategories (resources){
    let allSubCategories = []
    for (idx = 0; idx < resources.records.length; idx++){
        const resourceSubCategory = resources.records[idx]['CEF_Sub_Category__c']
        if (resourceSubCategory !== null){
            let separatedSubCategory = separateList(resourceSubCategory)
            if (typeof separatedSubCategory === 'object') {
                let listLength = separatedSubCategory.length
                for (let i = 0; i < listLength; i++) {
                    let subCat = separatedSubCategory[i].replace(' ', '')
                    if (!allSubCategories.includes(subCat)){
                        allSubCategories.push(subCat)
                    }
                }
            }
            if (typeof separatedSubCategory === 'string') {
                let subCat = separatedSubCategory.replace(' ', '')
                if (!allSubCategories.includes(subCat)){
                    allSubCategories.push(subCat)
                }
            } 
        }
    }
    return allSubCategories
}

function getAllSecondaryTags (resources){
    let allSecondaryTags = []
    for (idx = 0; idx < resources.records.length; idx++){
        const resourceSecondaryTag = resources.records[idx]['Secondary_Tags__c']
        if (resourceSecondaryTag !== null){
            let separatedSecondaryTags = separateList(resourceSecondaryTag)
            if (typeof separatedSecondaryTags === 'object') {
                let listLength = separatedSecondaryTags.length
                for (let i = 0; i < listLength; i++) {
                    let secondTag = separatedSecondaryTags[i].replace(' ', '')
                    if (!allSecondaryTags.includes(secondTag)){
                        allSecondaryTags.push(secondTag)
                    }
                }
            }
            if (typeof separatedSecondaryTags === 'string') {
                let secondTag = separatedSecondaryTags.replace(' ', '')
                if (!allSecondaryTags.includes(secondTag)){
                    allSecondaryTags.push(secondTag)
                }
            } 
        }
    }
    return allSecondaryTags
}


function separateList (joinedList) {
  if (joinedList === null) {
    return null
  }
  if (joinedList.includes(';')) {
    let separatedList = joinedList.split(';')
    return separatedList
  }
  if (joinedList.includes('|')) {
    let separatedList = joinedList.split('|')
    return separatedList
  }
  return joinedList
}

function addIconToCategory (catList) {
  if (catList.indexOf('Emergency') >= 0) {
    return 'error'
  }
  if (catList.indexOf('Food') >= 0) {
    return 'local_dining'
  }
  if (catList.indexOf('Housing') >= 0) {
    return 'local_hotel'
  }
  if (catList.indexOf('Goods') >= 0) {
    return 'shopping_basket'
  }
  if (catList.indexOf('Transportation') >= 0) {
    return 'commute'
  }
  if (catList.indexOf('Health') >= 0) {
    return 'local_hospital'
  }
  if (catList.indexOf('Finances') >= 0) {
    return 'account_balance'
  }
  if (catList.indexOf('Care') >= 0) {
    return 'accessibility_new'
  }
  if (catList.indexOf('Education') >= 0) {
    return 'school'
  }
  if (catList.indexOf('Employment') >= 0) {
    return 'business_center'
  }
  if (catList.indexOf('Legal') >= 0) {
    return 'local_hospital'
  }
  if (catList.indexOf('Communication') >= 0) {
    return 'feedback'
  }
  if (catList.indexOf('OneStop') >= 0) {
    return 'stars'
  }
}


function populateList(resources, idx){
    const resourceList = query('.list-of-resources')
    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('h2')
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
    const subCategoryTag = document.createElement('div')
    const subCategoryList = document.createElement('div')
    const secondaryTag = document.createElement('div')
    const secondaryTagList = document.createElement('div')
    const googleTag = document.createElement('span')

  const resourceId = resources.records[idx]['Id']
  const resourceName = resources.records[idx].Name
  const resourceWeb = resources.records[idx]['Website']
  const resourcePhone = resources.records[idx]['Imported_Phone__c']
  const resourceEmail = resources.records[idx]['Company_Email__c']
  const resourceCategory = resources.records[idx]['CEF_Category__c']
  const resourceDesc = resources.records[idx]['Description_Short__c']
  const resourceEligible = resources.records[idx]['Eligibility_Criteria__c']
  const resourceCity = resources.records[idx]['City_Served__c']
  const resourceSubCategory = resources.records[idx]['CEF_Sub_Category__c']
  const resourceSecondaryTag = resources.records[idx]['Secondary_Tags__c']


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
    googleTag.className = 'google-search'


  let cityList = separateList(resourceCity)
  if (cityList !== null) {
    if (typeof cityList === 'object') {
      let listLength = cityList.length
      for (let i = 0; i < listLength; i++) {
        let cityServedTag = document.createElement('span')
        let city = cityList[i].replace(' ', '')
        while (city.includes(' ')){
                city = city.replace(' ', '')
            }
        cityServedTag.classList.add('listed-city', (`${city}`))
        resourceTag.classList.add(`${city}`)
        cityServedTag.setAttribute('style', 'display:hidden')
        resourceTag.appendChild(cityServedTag)
      }
    }
    if (typeof cityList === 'string') {
      let city = cityList.replace(' ', '')
      while (city.includes(' ')){
                city = city.replace(' ', '')
            }
      cityServedTag.classList.add('listed-city', (`${city}`))
      resourceTag.classList.add(`${city}`)
      cityServedTag.setAttribute('style', 'display:hidden')
      resourceTag.appendChild(cityServedTag)
    }
  }
  resourceTag.setAttribute('style', 'display:hidden')

let subCatList = separateList(resourceSubCategory)
  if (subCatList !== null) {
    if (typeof subCatList === 'object') {  
      let listLength = subCatList.length
      for (let i = 0; i < listLength; i++) {
        let subCategoryTag = document.createElement('span')
        let subCat = subCatList[i].replace(' ', '')
            while (subCat.includes(' ')){
                subCat = subCat.replace(' ', '')
            }
        subCategoryTag.classList.add('listed-subCat', (`${subCat}`))
        resourceTag.classList.add(`${subCat}`)
        subCategoryTag.setAttribute('style', 'display:hidden')
        resourceTag.appendChild(subCategoryTag)
      }
    }
    if (typeof subCatList === 'string') {
      let subCat = subCatList.replace(' ', '')
            while (subCat.includes(' ')){
                subCat = subCat.replace(' ', '')
            }
      subCategoryTag.classList.add('listed-subCat', (`${subCat}`))
      resourceTag.classList.add(`${subCat}`)
      subCategoryTag.setAttribute('style', 'display:hidden')
      resourceTag.appendChild(subCategoryTag)
    }
  }
  resourceTag.setAttribute('style', 'display:hidden')

    let secondTagList = separateList(resourceSecondaryTag)
    if (secondTagList !== null) {
        if (typeof secondTagList === 'object') {  
        let listLength = secondTagList.length
        for (let i = 0; i < listLength; i++) {
            let secondTag = document.createElement('span')
            let tag = secondTagList[i].replace(' ', '')
                while (tag.includes(' ')){
                    tag = tag.replace(' ', '')
                }
            secondaryTag.classList.add('listed-tag', (`${tag}`))
            resourceTag.classList.add(`${tag}`)
            secondaryTag.setAttribute('style', 'display:hidden')
            resourceTag.appendChild(secondaryTag)
        }
        }
        if (typeof secondTagList === 'string') {
        let tag = secondTagList.replace(' ', '')
                while (tag.includes(' ')){
                    tag = tag.replace(' ', '')
                }
        secondaryTag.classList.add('listed-tag', (`${tag}`))
        resourceTag.classList.add(`${tag}`)
        secondaryTag.setAttribute('style', 'display:hidden')
        resourceTag.appendChild(secondaryTag)
        }
    }
    resourceTag.setAttribute('style', 'display:hidden')

  let catList = separateList(resourceCategory)
  if (catList !== null) {
    if (typeof catList === 'object') {
      let listLength = catList.length
      for (let i = 0; i < listLength; i++) {
        let categoryTag = document.createElement('span')
        let cat = catList[i].replace(' ', '')
        let lowerCat = cat.toLowerCase()
        categoryTag.innerText = catList[i]
        categoryTag.classList.add('listed-cat', (`${cat}`))
        resourceTag.classList.add(`${cat}`)
        let iconName = addIconToCategory(cat)
        categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
        categoryList.appendChild(categoryTag)
      }
    }
  }
    seeMoreTag.innerHTML = `<a title= "See a detailed description of this resource" class="" href="/resource/${resourceId}"><i class="fa fa-2x fa-chevron-right"></i></a>`
    nameTag.innerText = resourceName
    webTag.innerHTML = `<a title="Visit resource's web page" class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
    phoneTag.innerHTML = `<a title="Call resource" class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
    emailTag.innerHTML = `<a title= "Email resource" class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`
    descTag.innerText = resourceDesc
    if (resourceEligible !== null){
      eligibiliyTag.innerHTML = `<i class="fa fa-ruler-combined" title="Some eligibility requirements exist"></i>Some Requirements`
    }
    googleTag.innerHTML = `<a title= "Google search" class="foo-button mdc-button" href="https://www.google.com/search?q=${resourceName}"><i class="fab fa-google"></i>  Google</a>`
    descTag.innerText = resourceDesc
   
    resourceList.appendChild(resourceTag)
    resourceTag.appendChild(nameTag)
    resourceTag.appendChild(infoTag)
    resourceTag.appendChild(cityServedList)
    infoTag.appendChild(categoryList)
    infoTag.appendChild(subCategoryList)
    infoTag.appendChild(secondaryTagList)
    infoTag.appendChild(webTag)
    infoTag.appendChild(phoneTag)
    infoTag.appendChild(emailTag)
    infoTag.appendChild(eligibiliyTag)
    infoTag.appendChild(googleTag)
    resourceTag.appendChild(descTag)
    resourceTag.appendChild(seeMoreTag) 
}

function slide(input) {
    resource = queryAll('.listed-resource')
    for (let idx = 0; idx < resource.length; idx++){
        if (resource[idx].classList.contains(input)){
            resource[idx].classList.toggle('hide')
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
  query('#search-form').addEventListener('submit', function (event) {
    let input = query('#name')
    let upperInput = toJoinTitleCaseWords(input.value)
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    searchAny(toTitleCase(input.value), upperInput, resources)
    input.value = ''
  })
  query('#emergency-search').addEventListener('submit', function (event) {
    let input = query('#emergency-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#food-search').addEventListener('submit', function (event) {
    let input = query('#food-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#housing-search').addEventListener('submit', function (event) {
    let input = query('#housing-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#goods-search').addEventListener('submit', function (event) {
    let input = query('#goods-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#transportation-search').addEventListener('submit', function (event) {
    let input = query('#transportation-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#health-search').addEventListener('submit', function (event) {
    let input = query('#health-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#finances-search').addEventListener('submit', function (event) {
    let input = query('#finances-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#care-search').addEventListener('submit', function (event) {
    let input = query('#care-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#education-search').addEventListener('submit', function (event) {
    let input = query('#education-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#employment-search').addEventListener('submit', function (event) {
    let input = query('#employment-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#legal-search').addEventListener('submit', function (event) {
    let input = query('#legal-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#communication-search').addEventListener('submit', function (event) {
    let input = query('#communication-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
  query('#onestop-search').addEventListener('submit', function (event) {
    let input = query('#onestop-button')
    // don't try to submit this form. Do what I ask instead.
    event.preventDefault()
    updateList(input.value)
  })
})
