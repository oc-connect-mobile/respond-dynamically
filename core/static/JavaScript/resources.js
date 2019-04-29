let resources = data
// let sosl = sosl

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

// function searchAny (input, modifiedInput, resources) {
//     let allCats = getAllCategories(resources)
//     let allCities = getAllCities(resources)
//     let allSubCats = getAllSubCategories(resources)
//     let allSecondaryTags = getAllSecondaryTags(resources)

//     if (modifiedInput.some(v=> allCats.indexOf(v) !== -1) || modifiedInput.some(v=> allCities.indexOf(v) !== -1) || modifiedInput.some(v=> allSubCats.indexOf(v) !== -1) || modifiedInput.some(v=> allSecondaryTags.indexOf(v) !== -1)){
//         updateList(input)
//     }  
// }   

function updateList (input) {
  const resourcesList = query('.list-of-resources')
  resourcesList.innerHTML = ''
  resources = data
  let filters = query('.city-filter-box')
  filters.classList.remove('hide')
  let counter = 0
  for (idx = 0; idx < resources.records.length; idx++) {
    cityTest = resources.records[idx]['City_Served__c']
    categoryTest = resources.records[idx]['CEF_Category__c']
    if (cityTest === null && categoryTest === null){
      continue
    }
    if ((cityTest !== null && categoryTest !== null) && (cityTest.includes(input) || categoryTest.includes(input))) {
      populateList(resources, idx)
      counter += 1
    } else if (cityTest !== null && cityTest.includes(input)) {
      populateList(resources, idx)
      counter += 1
    } else if (categoryTest !== null && categoryTest.includes(input)) {
      populateList(resources, idx)
      counter += 1
    }
  }
//   query('.resources-number').innerHTML = `<p class="resources-number">We found ${counter} resources for you.</p>`
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
    return 'home'
  }
  if (catList.indexOf('Goods') >= 0) {
    return 'shopping_cart'
  }
  if (catList.indexOf('Transportation') >= 0) {
    return 'commute'
  }
  if (catList.indexOf('Health') >= 0) {
    return 'favorite'
  }
  if (catList.indexOf('Finances') >= 0) {
    return 'monetization_on'
  }
  if (catList.indexOf('Care') >= 0) {
    return 'accessibility_new'
  }
  if (catList.indexOf('Education') >= 0) {
    return 'school'
  }
  if (catList.indexOf('Employment') >= 0) {
    return 'work'
  }
  if (catList.indexOf('Legal') >= 0) {
    return 'gavel'
  }
  if (catList.indexOf('Communication') >= 0) {
    return 'headset_mic'
  }
  if (catList.indexOf('OneStop') >= 0) {
    return 'stars'
  }
}

function populateList(resources, idx){
    const welcomeTag = query('.welcome')
    const welcomeMessage = query('.welcome-message')
    welcomeTag.innerText = ''
    welcomeMessage.innerText = ''

    const resourceList = query('.list-of-resources')
    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('h3')
    const infoTag = document.createElement('span')
    const numOfResources = document.createElement('div')
    
    const contactInfoDiv = document.createElement('div')
    const webTag = document.createElement('button')
    const phoneTag = document.createElement('button') 
    const emailTag = document.createElement('button')
    const mapTag = document.createElement('button')

    const resourcePrimary_City = resources.Primary_City__c
    const resourcePrimary_State = resources.Primary_State__c
    const resourcePrimary_Street = resources.Primary_Street__c

    const categoryList = document.createElement('div')
    const categoryTag = document.createElement('span')
    const descTag = document.createElement('p')
    const eligibiliyTag = document.createElement('span')
    const seeMoreTag = document.createElement('button')
    const cityServedTag = document.createElement('div')
    const cityServedList = document.createElement('div')
    const subCategoryList = document.createElement('div')
    const secondaryTagList = document.createElement('div')
    // const googleTag = document.createElement('span')

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
    numOfResources.className = 'resources-number'
    infoTag.className = 'info'
    nameTag.className = 'listed-name'
    descTag.className = 'listed-desc'

    contactInfoDiv.className = 'contact-info'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
    emailTag.className = 'listed-email'
    mapTag.className = 'listed-map'

    categoryList.className = 'category-list'
    eligibiliyTag.classList.add('listed_criteria', 'foo-button', 'mdc-button')
    seeMoreTag.className = 'listed-detail'
    cityServedTag.className = 'city-list'
    // googleTag.className = 'google-search'


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
        categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" style="padding:.3rem" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
        categoryList.appendChild(categoryTag)
      }
    }
    else{
        let categoryTag = document.createElement('span')
        let cat = catList.replace(' ', '')
        let lowerCat = cat.toLowerCase()
        categoryTag.innerText = catList
        categoryTag.classList.add('listed-cat', (`${cat}`))
        resourceTag.classList.add(`${cat}`)
        let iconName = addIconToCategory(cat)
        categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" style="padding:.3rem"title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
        categoryList.appendChild(categoryTag)
    }
  }
    seeMoreTag.innerHTML = `<a title= "See a detailed description of this resource" class="" href="/resource/${resourceId}"><i class="fa fa-2x fa-chevron-right"></i></a>`

    if (resourceEligible !== null){
      nameTag.innerHTML = `<h3>${resourceName} <i title="see details for eligibility" class="fas fa-flag" style="font-size:1rem; color:#FF8765;" ></i></h3>`
    } else {nameTag.innerHTML = `<h3>${resourceName}</h3>`}


    if (resourceWeb === null && resourcePhone === null && resourceEmail === null){
        contactInfoDiv.classList.add('hide')
    }
    else {
        contactInfoDiv.classList.remove('hide')
        contactInfoDiv.innerHTML = `<strong>Contact Info:</strong><br>`
    }

    webTag.innerHTML = resourceWeb
      if (resourceWeb !== null){
        webTag.innerHTML =`<a title="Visit resource's web page" class="" href="${resourceWeb}"><i class="fa fa-2x fa-globe-americas"></i></a>`
      }
      else {
        webTag.classList.add('hide')
      }
    phoneTag.innerHTML = resourcePhone
      if (resourcePhone !== null){
        phoneTag.innerHTML = `<a title="Call resource" href="tel:${resourcePhone}"><i class="fa fa-2x fa-phone"></i></a>`
      }
      else {
        phoneTag.classList.add('hide')
      }

    emailTag.innerHTML = resourceEmail
      if (resourceEmail !== null){
        emailTag.innerHTML =`<a title= "Email resource" class="" href="mailto:${resourceEmail}"><i class="fa fa-2x fa-envelope"></i></a>`
      }
      else {
        emailTag.classList.add('hide')
      }
      mapTag.innerHTML = `<a title="Google directions" class="" href="https://www.google.com/maps/?daddr=${resourcePrimary_Street}+${resourcePrimary_City}+${resourcePrimary_State}"><i class="fas fa-2x fa-directions"></i></a>`


    descTag.innerHTML = `<br><p>${resourceDesc}</p>`
    // if (resourceEligible !== null){
    //   eligibiliyTag.innerHTML = `<i class="fas fa-flag" title="Some eligibility requirements exist"></i>Some Requirements`
    // }


    descTag.innerText = resourceDesc
   
    resourceList.appendChild(resourceTag)
    resourceList.appendChild(numOfResources)
    resourceTag.appendChild(nameTag)
    resourceTag.appendChild(infoTag)
    resourceTag.appendChild(cityServedList)
    
    infoTag.appendChild(subCategoryList)
    infoTag.appendChild(secondaryTagList)
    infoTag.appendChild(webTag)
    infoTag.appendChild(phoneTag)
    infoTag.appendChild(emailTag)

    resourceTag.appendChild(descTag)
    infoTag.appendChild(categoryList)
    resourceTag.appendChild(contactInfoDiv)
    contactInfoDiv.appendChild(webTag)
    contactInfoDiv.appendChild(phoneTag)
    contactInfoDiv.appendChild(emailTag)
    contactInfoDiv.appendChild(mapTag)

    resourceTag.appendChild(seeMoreTag) 
    
}

function slideUpResource(input) {
    let noSpaceInput = input.replace(' ', '')
    resource = queryAll('.listed-resource')
    let button = query(`.toggleButton-${noSpaceInput}`)
    let buttons = queryAll('.toggleButton')
    for (let idx = 0; idx < resource.length; idx++){
        console.log('start of new resource')
        if (resource[idx].classList.contains(noSpaceInput) && resource[idx].classList.contains('hide')){
            // isButtonToggled(button, buttons)
            resource[idx].classList.remove('hide')
        }
        else if (resource[idx].classList.contains(noSpaceInput) && !resource[idx].classList.contains('hide')){
            // isButtonToggled(button, buttons)
            resource[idx].classList.remove('hide')
        }
        else if (!resource[idx].classList.contains(noSpaceInput) && !resource[idx].classList.contains('hide')){
            // isButtonToggled(button, buttons)
            resource[idx].classList.add('hide')
        }
        else if (!resource[idx].classList.contains(noSpaceInput) && resource[idx].classList.contains('hide')){
            // isButtonToggled(button, buttons)
            resource[idx].classList.remove('hide')
        }
    }
    isButtonToggled(button, buttons)
}   

function isButtonToggled(button, buttons){
    for (let idx = 0; idx < buttons.length; idx++){
        if (buttons[idx].value !== button.value && buttons[idx].classList.contains('toggle-selected')){
            buttons[idx].classList.remove ('toggle-selected')
        }
    }
    if (!button.classList.contains('toggle-selected')){
        button.classList.add('toggle-selected')
    }
    else if (button.classList.contains('toggle-selected')){
        button.classList.remove('toggle-selected')
    }
    
}
function isHideToggled(resource){
    if (resource.classList.contains('hide')){
        resource.classList.remove('hide')       
    }
    else{
        resource.classList.add('hide')
    }
}


function hideCityFilters() {
    filterBox = query('.filter-btns')
    filterBox.classList.toggle('hide')
    
}

function hideCatFilters() {
    filterBox = query('.category-search-btns')
    filterBox.classList.toggle('hide')
}

document.addEventListener('DOMContentLoaded', function () {
//   query('#search-form').addEventListener('submit', function (event) {
//     let input = query('#name')
//     let upperInput = toJoinTitleCaseWords(input.value)
//     // don't try to submit this form. Do what I ask instead.
//     event.preventDefault()
//     searchAny(toTitleCase(input.value), upperInput, resources)
//     input.value = ''
//   })

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
  
//   document.getElementById('search-button2').addEventListener('click', function (event) {
//     console.log("SEARCH BUTTON HIT")
//     const resourcesList = query('.list-of-resources')
//     resourcesList.innerHTML = ''
//     // resources = data
//     populateList(resources) 
//   })

//   document.getElementById('clearbar').addEventListener('click', function (event) {
//     console.log("CLEAR BUTTON HIT")
//     const resourcesList = query('.list-of-resources')
//     resourcesList.innerHTML = ''
//     resources = data
//     for (idx = 0; idx < resources.records.length; idx++) {
//       populateList(resources, idx) 
//     }
//   })
})


