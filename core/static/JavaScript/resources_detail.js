let resources = data2
console.log(resources.Name)

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

//////////////////////////////
function searchAny (input, modifiedInput, resources) {
  let allCats = getAllCategories(resources)
  let allCities = getAllCities(resources)
  if (modifiedInput.some(v=> allCats.indexOf(v) !== -1) || modifiedInput.some(v=> allCities.indexOf(v) !== -1)){
      updateList(input)
  }  
}   

function updateList (input) {
const resourcesList = query('.list-of-resources')
resourcesList.innerHTML = ''

  cityTest = resources.City_Served__c
  categoryTest = resources.CEF_Category__c
  if (cityTest === null && categoryTest === null) {
   
  if ((cityTest !== null && categoryTest !== null) && cityTest.includes(input) || categoryTest.includes(input)) {
    populate(resources)
  } else if (cityTest !== null && cityTest.includes(input)) {
    populate(resources)
  } else if (categoryTest !== null && categoryTest.includes(input)) {
    populate(resources)
  }
}
}
///////////////////////////




function getAllCategories (resources){
    let allCategories = []
    
        const resourceCategory = resources.CEF_Category__c
        if (resourceCategory !== null){
            let separatedCats = separateCategory(resourceCategory)
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
    
    return allCategories
}

function getAllCities (resources){
    let allCities = []
    
        const resourceCity = resources.City_Served__c
        if (resourceCity !== null){
            let separatedCity = separateCity(resourceCity)
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
    
    return allCities
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


function populate(resources){
  const hereIsGood = query('.here-is-good')
  const thebreaks = '<br><br><br><br><br><br><br><br><br><br><br>'
  hereIsGood.innerHTML = thebreaks



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
    const cityServedTag = document.createElement('div')
    const cityServedList = document.createElement('div')
    

  const resourceId = resources.Id
  const resourceName = resources.Name
  const resourceWeb = resources.Website
  const resourcePhone = resources.Imported_Phone__c
  const resourceEmail = resources.Company_Email__c
  const resourceCategory = resources.CEF_Category__c
  const resourceDesc = resources.Description_Short__c
  const resourceEligible = resources.Eligibility_Criteria__c
  const resourceCity = resources.City_Served__c

  console.log(resourceEmail)

    resourceTag.className = 'listed-resource'
    infoTag.className = 'info'
    nameTag.className = 'listed-name'
    descTag.className = 'listed-desc'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
    emailTag.className = 'listed-email'
    categoryList.className = 'category-list'
    eligibiliyTag.classList.add('listed_criteria', 'foo-button', 'mdc-button')
    cityServedTag.className = 'city-list'
    


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
        let lowerCat = cat.toLowerCase()
        categoryTag.innerText = catList[i]
        categoryTag.classList.add('listed-cat', (`${cat}`))
        let iconName = addIconToCategory(cat)
        categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
        categoryList.appendChild(categoryTag)
      }
    }
  }

    console.log(catList)
    console.log(nameTag)

    
    nameTag.innerText = resourceName
    webTag.innerHTML = `<a title="Visit resource's web page" class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
    phoneTag.innerHTML = `<a title="Call resource" class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
    emailTag.innerHTML = `<a title= "Email resource" class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`
    descTag.innerText = resourceDesc
    if (resourceEligible !== null){
      eligibiliyTag.innerHTML = `<i class="fa fa-ruler-combined" title="Some eligibility requirements exist"></i>Some Requirements`
    }
    descTag.innerText = resourceDesc
   
    console.log(nameTag)

    hereIsGood.appendChild(nameTag)
    hereIsGood.appendChild(infoTag)
    hereIsGood.appendChild(categoryList)
    hereIsGood.appendChild(cityServedList)
    hereIsGood.appendChild(webTag)
    hereIsGood.appendChild(phoneTag)
    hereIsGood.appendChild(emailTag)
    hereIsGood.appendChild(eligibiliyTag)

    hereIsGood.appendChild(descTag)

   console.log("end of populate function")
}

  

populate(resources) 





////////////////////
const resourcePrimary_City__c = resources.Primary_City__c
const resourcePrimary_State__c = resources.Primary_State__c
const resourcePrimary_Street__c = resources.Primary_Street__c
const resourcePrimary_Zip__c = resources.Primary_Zip__c
const resourceServices_txt__c = resources.Services_txt__c
const resourcepostalCode = resources.postalCode
const resourcestate = resources.state
const resourcestreet = resources.street
const resourceLastModifiedDate = resources.LastModifiedDate
const resourceLastActivityDate = resources.LastActivityDate
const resourceLastViewedDate = resources.LastViewedDate
const resourceDescription = resources.Description
const resourceLatino_Services__c = resources.Latino_Services__c
const resourceHours__c = resources.Hours__c
const resourceSaturday_Hours__c = resources.Saturday_Hours__c
const resourceFriday_Hours__c = resources.Friday_Hours__c
const resourceThursday_Hours__c = resources.Thursday_Hours__c
const resourceWednesday_Hours__c = resources.Wednesday_Hours__c
const resourceTuesday_Hours__c = resources.Tuesday_Hours__c
const resourceMonday_Hours__c = resources.Monday_Hours__c
const resourceSunday_Hours__c = resources.Sunday_Hours__c
const resourceMonday_Friday_Hours__c = resources.Monday_Friday_Hours__c
const resourceOther_Hours__c = resources.Other_Hours__c
const resourceHours_Format__c = resources.Hours_Format__c
const resourceParentId = resources.ParentId