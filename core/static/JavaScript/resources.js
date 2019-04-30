let resources = data

function query (selector) {
    return document.querySelector(selector)
}

function queryAll (selector) {
    return document.querySelectorAll(selector)
}

function updateList (input) {
    const resourcesList = query('.list-of-resources')
    resourcesList.innerHTML = ''
    resources = data
    let filters = query('.city-filter-box')
    filters.classList.remove('hide')
    let cityTest = getAllCities(resources)
    let categoryTest = getAllCategories(resources)
    for (idx = 0; idx < resources.records.length; idx++) {
        // cityTest = resources.records[idx]['City_Served__c']
        // categoryTest = resources.records[idx]['CEF_Category__c']
        if (cityTest === null && categoryTest === null){
        continue
        }
        if ((cityTest !== null && categoryTest !== null) && (cityTest.includes(input) || categoryTest.includes(input))) {
        populateList(resources, idx)
        } else if (cityTest !== null && cityTest.includes(input)) {
        populateList(resources, idx)
        } else if (categoryTest !== null && categoryTest.includes(input)) {
        populateList(resources, idx)
        }
    }
    const numOfResources = query('.number-of-resources')
    numOfResources.innerHTML = `<p class="resources-number">We found these ${input} resources for you.</p>`


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
    
    const contactInfoDiv = document.createElement('div')
    const webTag = document.createElement('button')
    const phoneTag = document.createElement('button') 
    const emailTag = document.createElement('button')
    const mapTag = document.createElement('button')


    const categoryList = document.createElement('div')
    const categoryTag = document.createElement('span')
    const descTag = document.createElement('p')
    const eligibiliyTag = document.createElement('span')
    const seeMoreTag = document.createElement('button')
    const cityServedTag = document.createElement('div')
    const cityServedList = document.createElement('div')
    const subCategoryList = document.createElement('div')
    const secondaryTagList = document.createElement('div')
    const resourcePrimary_Street = resources.records[idx]['Primary_Street__c']
    const resourcePrimary_City = resources.records[idx]['Primary_City__c']
    const resourcePrimary_State = resources.records[idx]['Primary_State__c']

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

    contactInfoDiv.className = 'contact-info'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
    emailTag.className = 'listed-email'
    mapTag.className = 'listed-map'

    categoryList.className = 'category-list'
    eligibiliyTag.classList.add('listed_criteria', 'foo-button', 'mdc-button')
    seeMoreTag.className = 'listed-detail'
    cityServedTag.className = 'city-list'

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
    }   
    else {
        nameTag.innerHTML = `<h3>${resourceName}</h3>`
    }

    if (resourceWeb === null && resourcePhone === null && resourceEmail === null){
        contactInfoDiv.classList.add('hide')
    }
    else {
        contactInfoDiv.classList.remove('hide')
        contactInfoDiv.innerHTML = `<strong>Contact Info</strong><br>`
    }

    webTag.innerHTML = resourceWeb

      if (resourceWeb !== null){
        webTag.innerHTML =`<a title="Visit resource's web page" class="" href="${resourceWeb}"><i class="fa fa-2x fa-globe-americas"></i></a>`
      }
      else {
        webTag.classList.add('hide')
      }
    
    phoneTag.innerHTML = resourcePhone

      if (resourcePhone !== null && hasNumber(resourcePhone)){
        newPhone = resourcePhone.match(/[\d+]/g).join('')
        phoneTag.innerHTML = `<a title="Call resource" href="tel:${newPhone}"><i class="fa fa-2x fa-phone"></i></a>`
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

    if (resourcePrimary_Street !== null && resourcePrimary_City !== null && resourcePrimary_State !== null) {
      mapTag.innerHTML = `<a title="Google directions" class="" href="https://www.google.com/maps/?daddr=${resourcePrimary_Street}+${resourcePrimary_City}+${resourcePrimary_State}"><i class="fas fa-2x fa-directions"></i></a>`
      }
      else {
        mapTag.classList.add('hide')
      }

    descTag.innerHTML = `<br><p>${resourceDesc}</p>`

    descTag.innerText = resourceDesc
   
    resourceList.appendChild(resourceTag)
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

function hasNumber(myString) {
  return /\d/.test(myString);
}

function slideUpResource(input) {
    let noSpaceInput = input.replace(' ', '')
    resource = queryAll('.listed-resource')
    let button = query(`.toggleButton-${noSpaceInput}`)
    let buttons = queryAll('.toggleButton')
    for (let idx = 0; idx < resource.length; idx++){
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
    query('#emergency-search').addEventListener('submit', function (event) {
        let input = query('#emergency-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#food-search').addEventListener('submit', function (event) {
        let input = query('#food-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#housing-search').addEventListener('submit', function (event) {
        let input = query('#housing-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#goods-search').addEventListener('submit', function (event) {
        let input = query('#goods-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#transportation-search').addEventListener('submit', function (event) {
        let input = query('#transportation-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#health-search').addEventListener('submit', function (event) {
        let input = query('#health-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#finances-search').addEventListener('submit', function (event) {
        let input = query('#finances-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#care-search').addEventListener('submit', function (event) {
        let input = query('#care-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#education-search').addEventListener('submit', function (event) {
        let input = query('#education-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#employment-search').addEventListener('submit', function (event) {
        let input = query('#employment-button')
        event.preventDefault()
        updateList(input.value)
    })
    query('#legal-search').addEventListener('submit', function (event) {
        let input = query('#legal-button')
        event.preventDefault()
        updateList(input.value)
    })
})


