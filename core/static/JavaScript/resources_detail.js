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
 



    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('h2')
    const infoTag = document.createElement('span')
    const webTag = document.createElement('span')
    const phoneTag = document.createElement('span') 
    const emailTag = document.createElement('span')
    const categoryList = document.createElement('div')
    const categoryTag = document.createElement('span')
    const descTag = document.createElement('p')
    const eligibilityTag = document.createElement('span')
    const eligibilityPart = document.createElement('div')
    const cityServedTag = document.createElement('div')
    const cityServedList = document.createElement('div')

    const waittimePart = document.createElement('div')
    const espanolPart = document.createElement('div')
    const hoursPart = document.createElement('div')
    const addressPart = document.createElement('div')
    const mapPart = document.createElement('div')
    

  const resourceId = resources.Id
  const resourceName = resources.Name
  const resourceWeb = resources.Website
  const resourcePhone = resources.Imported_Phone__c
  const resourceEmail = resources.Company_Email__c
  const resourceCategory = resources.CEF_Category__c
  const resourceDesc = resources.Description_Short__c
  const resourceEligible = resources.Eligibility_Criteria__c
  const resourceCity = resources.City_Served__c
  const googleTag = document.createElement('span')
  const mapTag = document.createElement('span')

  const resourcePrimary_City = resources.Primary_City__c
  const resourcePrimary_State = resources.Primary_State__c
  const resourcePrimary_Street = resources.Primary_Street__c
  const resourcePrimary_Zip = resources.Primary_Zip__c
  const resourceServices_txt = resources.Services_txt__c
  const resourcepostalCode = resources.postalCode
  const resourcestate = resources.state
  const resourcestreet = resources.street
  const resourceLastModifiedDate = resources.LastModifiedDate
  const resourceLastActivityDate = resources.LastActivityDate
  const resourceLastViewedDate = resources.LastViewedDate
  const resourceDescription = resources.Description
  const resourceLatino_Services = resources.Latino_Services__c
  const resourceHours = resources.Hours__c
  const resourceSaturday_Hours = resources.Saturday_Hours__c
  const resourceFriday_Hours = resources.Friday_Hours__c
  const resourceThursday_Hours = resources.Thursday_Hours__c
  const resourceWednesday_Hours = resources.Wednesday_Hours__c
  const resourceTuesday_Hours = resources.Tuesday_Hours__c
  const resourceMonday_Hours = resources.Monday_Hours__c
  const resourceSunday_Hours = resources.Sunday_Hours__c
  const resourceMonday_Friday_Hours = resources.Monday_Friday_Hours__c
  const resourceOther_Hours = resources.Other_Hours__c
  const resourceHours_Format = resources.Hours_Format__c
  const resourceParentId = resources.ParentId
  const resourceTime_Till_Service = resources.Time_Till_Service__c

    resourceTag.className = 'listed-resource'
    infoTag.className = 'info'
    nameTag.className = 'listed-name'
    descTag.className = 'listed-desc'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
    emailTag.className = 'listed-email'
    categoryList.className = 'category-list'
    eligibilityPart.className = 'listed-desc'
    eligibilityTag.className = 'mdc-button'
    cityServedTag.className = 'listed-desc'
    addressPart.className = 'listed-desc'
    hoursPart.className = 'listed-desc'
    addressPart.className = 'listed-desc'
    waittimePart.className = 'listed-desc'
    espanolPart.className = 'listed-desc'
    mapPart.className = 'listed-desc'
    googleTag.className = 'google-search'
    mapTag.className = 'google-search'


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
        cityServedTag.className = 'listed-desc'
      }
    }
    if (typeof cityList === 'string') {
      let city = cityList.replace(' ', '')
      cityServedTag.classList.add('listed-city', (`${city}`))
      cityServedTag.setAttribute('style', 'display:hidden')
      cityServedList.appendChild(cityServedTag)
      cityServedTag.className = 'listed-desc'
    }
  }
  // cityServedList.setAttribute('style', 'display:hidden')
  

  nameTag.innerHTML= `<h2>${resourceName}</h2>`
  webTag.innerHTML = `<a title="Visit resource's web page" class="foo-button mdc-button" href="${resourceWeb}"><i class="fa fa-globe"></i> Website</a>`
  phoneTag.innerHTML = `<a title="Call resource" class="foo-button mdc-button" href="tel:${resourcePhone}"><i class="fa fa-phone"></i>  Phone</a>`
  emailTag.innerHTML = `<a title="Email resource" class="foo-button mdc-button" href="mailto:${resourceEmail}"><i class="fa fa-envelope"></i>  Email</a>`
  if (resourceEligible !== null){
    eligibilityTag.innerHTML = `<a class="foo-button mdc-buttons" style="text-decoration:none" title="See requirements below" href="#Elig"><i class="fas fa-flag"></i>See Requirements</a>`
  }
  googleTag.innerHTML = `<a title="Google search" class="foo-button mdc-button" href="https://www.google.com/search?q=${resourceName}"><i class="fab fa-google"></i>  Google</a>`
  mapTag.innerHTML = `<a title="Google directions" class="foo-button mdc-button" href="https://www.maps.google.com/?daddr=${resourcePrimary_Street}+${resourcePrimary_City}+${resourcePrimary_State}"><i class="fab fa-google"></i>Directions</a>`


    
  let catList = separateCategory(resourceCategory)
  console.log(catList)
  console.log(typeof(catList))
  if (catList !== null) {
    if (typeof catList === 'object') {
      let listLength = catList.length
      console.log(listLength)
      for (let i = 0; i < listLength; i++) {
        let categoryTag = document.createElement('span')
        let cat = catList[i].replace(' ', '')
        let lowerCat = cat.toLowerCase()
        console.log(lowerCat)
        categoryTag.innerText = catList[i]
        categoryTag.classList.add('listed-cat', (`${cat}`))
        console.log(categoryTag.classList)
        let iconName = addIconToCategory(cat)
        categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
        categoryList.appendChild(categoryTag)
      } }
    else { 
      let categoryTag = document.createElement('span')
      let cat = catList
      let lowerCat = cat.toLowerCase()
      console.log(lowerCat)
      categoryTag.innerText = catList
      categoryTag.classList.add('listed-cat', (`${cat}`))
      console.log(categoryTag.classList)
      let iconName = addIconToCategory(cat)
      categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
      categoryList.appendChild(categoryTag)
    }
    }
    
    cityList.toString().replace(",", ", ")
    
    waittimePart.innerHTML = `<h3 class="mdc-button">Wait Times</h3><p style="margin:.5rem">${resourceTime_Till_Service}<p>`
    espanolPart.innerHTML = `<h3 class="mdc-button">Español</h3><p style="margin:.5rem">${resourceLatino_Services}<p>`
    hoursPart.innerHTML = `<h3 class="mdc-button">Hours</h3><p style="margin:.5rem">${resourceHours}<p>`
    addressPart.innerHTML = `<h3 class="mdc-button">Address</h3><p style="margin:.5rem">${resourcePrimary_Street} <br> ${resourcePrimary_City}, ${resourcePrimary_State} ${resourcePrimary_Zip}<p>`
    categoryTag.innerHTML = `<h3 class="mdc-button">Categories</h3>`
    cityServedTag.innerHTML =  `<h3 class="mdc-button">Cities Served</h3><p style="margin:.5rem">${cityList}<p>`
    if (resourceDescription !== null) { 
      descTag.innerHTML = `<h3 class="mdc-button">Description</h3><p style="margin:.5rem">${resourceDesc} <br> ${resourceDescription}<p>`}
    else {
      descTag.innerHTML = `<h3 class="mdc-button">Description</h3><p style="margin:.5rem">${resourceDesc}` }
    eligibilityPart.innerHTML = `<h3 class="mdc-button" id="Elig">Eligibiltiy Requirements</h3><p style="margin:.5rem">${resourceEligible}<p>`
    // mapPart.innerHTML = `<h3 class="mdc-button" ><a href="https://maps.google.com/?daddr=${resourcePrimary_Street}+${resourcePrimary_City}+${resourcePrimary_State}">Map</a></h3>`

    hereIsGood.appendChild(nameTag)
    // hereIsGood.appendChild(infoTag)
    hereIsGood.appendChild(webTag)
    hereIsGood.appendChild(phoneTag)
    hereIsGood.appendChild(emailTag)
    hereIsGood.appendChild(eligibilityTag)
    hereIsGood.appendChild(googleTag)
    hereIsGood.appendChild(mapTag)
    // hereIsGood.appendChild(categoryTag)
    hereIsGood.appendChild(categoryList)
    hereIsGood.appendChild(cityServedTag)
    if (resourcePrimary_Street !== null) {hereIsGood.appendChild(addressPart)}
    if (resourceHours !== null) { hereIsGood.appendChild(hoursPart)}
    if (resourceTime_Till_Service !== null) { hereIsGood.appendChild(waittimePart) }
    if (resourceLatino_Services !== null) {hereIsGood.appendChild(espanolPart)}
    hereIsGood.appendChild(descTag)
    if (resourceEligible !== null) {hereIsGood.appendChild(eligibilityPart) }
    hereIsGood.appendChild(mapPart)
}
  
populate(resources) 





////////////////////
// const resourcePrimary_City = resources.Primary_City__c
// const resourcePrimary_State = resources.Primary_State__c
// const resourcePrimary_Street = resources.Primary_Street__c
// const resourcePrimary_Zip = resources.Primary_Zip__c
// const resourceServices = resources.Services_txt__c
// const resourcepostalCode = resources.postalCode
// const resourcestate = resources.state
// const resourcestreet = resources.street
// const resourceLastModifiedDate = resources.LastModifiedDate
// const resourceLastActivityDate = resources.LastActivityDate
// const resourceLastViewedDate = resources.LastViewedDate
// const resourceDescription = resources.Description
// const resourceLatino_Services = resources.Latino_Services__c
// const resourceHours = resources.Hours__c
// const resourceSaturday= resources.Saturday_Hours__c
// const resourceFriday = resources.Friday_Hours__c
// const resourceThursday = resources.Thursday_Hours__c
// const resourceWednesday = resources.Wednesday_Hours__c
// const resourceTuesday= resources.Tuesday_Hours__c
// const resourceMonday = resources.Monday_Hours__c
// const resourceSunday = resources.Sunday_Hours__c
// const resourceMonday_Friday = resources.Monday_Friday_Hours__c
// const resourceOther_Hours = resources.Other_Hours__c
// const resourceHours_Format = resources.Hours_Format__c
// const resourceParentId = resources.ParentId
// const resourceTime_Till_Service = resources.Time_Till_Service__c