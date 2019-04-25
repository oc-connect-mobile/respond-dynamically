// let hiddenClass = []
// let buttons = document.getElementsByClassName('toggleBtn')
// for(let i = 0; i < buttons.length; i++){
//   buttons[i].addEventListener('click', function(){
//     let self = this
//     console.log(self)
//     let elements = document.getElementsByClassName(self.value)
//     console.log(elements)   
//     toggleButtonState(self)
//     for(let i = 0; i < elements.length; i++) {
//       let element = elements[i]
  
//       let isHidden = false
//       let classes = element.className.split(' ')
//       for(let j = 0; j < classes.length; j++){
//         if(hiddenClass.indexOf(classes[j]) !== -1) isHidden = true
//       }
  
//       let vis = elements[i].style.visibility
//       console.log(vis)
//       if(vis === 'hidden' && !isHidden){
//         setVisibility(element, 'visible')
//       } else {
//         setVisibility(element, 'hidden')
//       } 
//     }
//   }) 
// }


// let input = document.getElementById('classFilter')

// input.addEventListener('input', function(){
//   let food = document.getElementsByClassName('category-list')
//   for(let i = 0; i < food.length; i++){
//     let ele = food[i]
//     if(ele.innerHTML.toLowerCase().indexOf(input.value.toLowerCase()) === -1) {
//       setVisibility(ele, 'hidden')
//     }else {
//       isHidden = false
//       let classes = ele.className.split(' ')
//       for(let j = 0; j < classes.length; j++){
//         if(hiddenClass.indexOf(classes[j]) !== -1) isHidden = true
//       }

//       if(!isHidden) setVisibility(ele, 'visible')
//     }
//   }
// })

// function setVisibility(element, visibility){
//   element.style.visibility = visibility
// }

// function setVisibilityByClass(name, visibility) {
//   let elements = document.getElementsByClassName(name)
//   for(let i = 0; i < elements.length; i++){
//     setVisibility(elements[i], visibility)
//   }
// }

// function toggleButtonState(element){
//   let on = element.className.indexOf('on') !== -1
//   if(on){
//     element.className = 'toggleBtn off'
//     if(hiddenClass.indexOf(element.value) === -1) hiddenClass.push(element.value)
//   }
//   if(!on){
//     element.className = 'toggleBtn on'
//     hiddenClass = hiddenClass.filter(function(x) { return x !== element.value })
//   }  
// }

// let buttons = document.getElementsByClassName('toggleBtn')
// for(let i = 0; i < buttons.length; i++){
//   buttons[i].addEventListener('click', function(){
//     let self = this
//     let elem = document.getElementsByClassName(self.value)
//   })
// }

// function slide(elem) {
//     elem.classList.toggle('hide')
// }

// document.addEventListener('DOMContentLoaded', function () {
//     let buttons = document.getElementsByClassName('')
//     slide(elem)
// })

