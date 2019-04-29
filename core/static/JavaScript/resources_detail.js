
let resources = data2

function betterPhone(rawphone) {
    var phoneRegEx = /[\d+]/g
    // var phoneRegEx = /[-]{0,1}[\d]/g keeps dashes
    // [-]{0,1}[\d]|[\(]|[\)] keeps parens
    newPhone = rawphone.match(phoneRegEx)
    return newPhone
}

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
}

function populate(resources){
  	const hereIsGood = query('.here-is-good')
    const resourceTag = document.createElement('div')
    const nameTag = document.createElement('h2')
	const infoTag = document.createElement('div')
	
	const contactInfoDiv = document.createElement('div')
    const webTag = document.createElement('button')
    const phoneTag = document.createElement('button') 
	const emailTag = document.createElement('button')
	// const mapPart = document.createElement('button')
	
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
	const googleTag = document.createElement('span')
	const mapTag = document.createElement('button')

	const resourceId = resources.Id
	const resourceName = resources.Name
	const resourceWeb = resources.Website
	const resourcePhone = resources.Imported_Phone__c
	const resourceEmail = resources.Company_Email__c
	const resourceCategory = resources.CEF_Category__c
	const resourceDesc = resources.Description_Short__c
	const resourceEligible = resources.Eligibility_Criteria__c
	const resourceCity = resources.City_Served__c
	const resourcePrimary_City = resources.Primary_City__c
	const resourcePrimary_State = resources.Primary_State__c
	const resourcePrimary_Street = resources.Primary_Street__c
	const resourcePrimary_Zip = resources.Primary_Zip__c
	const resourceDescription = resources.Description
	const resourceLatino_Services = resources.Latino_Services__c
	const resourceHours = resources.Hours__c
	const resourceTime_Till_Service = resources.Time_Till_Service__c

    resourceTag.className = 'listed-resource'
    infoTag.className = 'infodiv'
    nameTag.className = 'listed-name'
	descTag.className = 'listed-desc'
    contactInfoDiv.className = 'contact-info'
    webTag.className = 'listed-site'
    phoneTag.className = 'listed-phone'
	emailTag.className = 'listed-email'
    categoryList.className = 'infodiv'
    eligibilityPart.className = 'infodiv'
    eligibilityTag.className = 'listed-cat'
    cityServedTag.className = 'listed-desc'
    addressPart.className = 'listed-desc'
    hoursPart.className = 'listed-desc'
    addressPart.className = 'listed-desc'
    waittimePart.className = 'listed-desc'
    espanolPart.className = 'listed-desc'

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
  
  	if (resourceEligible !== null){
   		nameTag.innerHTML = `<h3>${resourceName}  <a class="foo-button mdc-buttons" style="text-decoration:none" title="skip to eligibility requirements below" href="#Elig"><i class="fas fa-flag" style="font-size:1rem; color: #FF8765"></i></a></h3>`
  	} 
	else {
		nameTag.innerHTML= `<h3>${resourceName}</h3>`
	}

  	contactInfoDiv.innerHTML = `<strong>Contact Info:</strong><br>`
    
    webTag.innerHTML = resourceWeb
	if (resourceWeb !== null){
		webTag.innerHTML =`<a title="Visit resource's web page" class="" href="${resourceWeb}"><i class="fas fa-2x fa-globe-americas"></i></a>`
	}
	else {
		webTag.classList.add('hide')
	}

	if (resourcePhone !== null){
		newPhone = betterPhone(resourcePhone).join('')
		phoneTag.innerHTML = newPhone
	}	
	if (resourcePhone !== null){
		phoneTag.innerHTML = `<a title="Call resource" href="tel:${newPhone}"><i class="fa fa-2x fa-phone"></i></a>`
	}
	else {
		phoneTag.classList.add('hide')
	}

      // console.log(resourcePhone)
      // const newresourcePhone = betterPhone(resources.Imported_Phone__c)
      // console.log(newresourcePhone)

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
				categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" style="padding:.3rem" title="${cat}" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
				categoryList.appendChild(categoryTag)
			} 
		}
		else { 
			let categoryTag = document.createElement('span')
			let cat = catList
			let lowerCat = cat.toLowerCase()
			
			categoryTag.innerText = catList
			categoryTag.classList.add('listed-cat', (`${cat}`))
			
			let iconName = addIconToCategory(cat)
			categoryTag.innerHTML = `<i class="material-icons i-${lowerCat}" title="${cat}" style="padding:.3rem" aria-label="${cat}" aria-hidden="true">${iconName}</i>`
			
			categoryList.appendChild(categoryTag)
		}
	}
    newCity = JSON.stringify(cityList).replace(`[`,``).replace(`]`,``).replace(/[""]/g, "").replace(/[,]/g, `, `)
    
    waittimePart.innerHTML = `<h3 class="h3style">Wait Times</h3><p style="margin:.5rem">${resourceTime_Till_Service}<p>`
    espanolPart.innerHTML = `<h3 class="h3style">Español</h3><p style="margin:.5rem">${resourceLatino_Services}<p>`
    hoursPart.innerHTML = `<h3 class="h3style">Hours</h3><p style="margin:.5rem">${resourceHours}<p>`
    addressPart.innerHTML = `<h3 class="h3style">Address</h3><p style="margin:.5rem">${resourcePrimary_Street} <br> ${resourcePrimary_City}, ${resourcePrimary_State} ${resourcePrimary_Zip}<p>`
    categoryTag.innerHTML = ``
    cityServedTag.innerHTML =  `<br><h3 class="h3style">Cities Served</h3><p style="margin:.5rem">${newCity}<p>`
    if (resourceDescription !== null) { 
      	descTag.innerHTML = `<h3 class="h3style">Description</h3><p style="margin:.5rem">${resourceDesc} <br><br> ${resourceDescription}<p>`
	}
    else {
      	descTag.innerHTML = `<h3 class="h3style">Description</h3><p style="margin:.5rem">${resourceDesc}` 
	}
    eligibilityPart.innerHTML = `<h3 class="h3style" id="Elig">Eligibility Requirements</h3><p style="margin:.5rem">${resourceEligible}<p>`

    hereIsGood.appendChild(nameTag)
	
    infoTag.appendChild(googleTag)
    if (cityList !== null) {contactInfoDiv.appendChild(mapTag)}
    // if (resourceEligible !== null) {hereIsGood.appendChild(eligibilityTag)}
    hereIsGood.appendChild(categoryTag)
    hereIsGood.appendChild(categoryList)
    if (cityList !== null) {hereIsGood.appendChild(cityServedTag)}
    if (resourcePrimary_Street !== null) {hereIsGood.appendChild(addressPart)}
    if (resourceHours !== null) { hereIsGood.appendChild(hoursPart)}
    if (resourceTime_Till_Service !== null) { hereIsGood.appendChild(waittimePart) }
    if (resourceLatino_Services !== null) {hereIsGood.appendChild(espanolPart)}
    hereIsGood.appendChild(descTag)
	if (resourceEligible !== null) {hereIsGood.appendChild(eligibilityPart) }
		
    contactInfoDiv.appendChild(webTag)
    contactInfoDiv.appendChild(phoneTag)
	contactInfoDiv.appendChild(emailTag)
	contactInfoDiv.appendChild(mapTag)
	hereIsGood.appendChild(contactInfoDiv)
	hereIsGood.appendChild(infoTag)
}

populate(resources) 

