//* ****  Trying to figure out getting the Modal working with Material IO was trying to work through this tutorial: https://www.youtube.com/watch?v=KW9YVSgGBrs&list=PLSQ4mck-bvilqfGFaYdbJ0z2KlD5U09mc&index=9&t=0s **** */

// import { MDCRipple } from '@material/ripple/index'

// import { MDCDialog } from '@material/dialog'
// import * as $ from 'jquery/dist/jquery.min'
// import { MDCList } from '@material/list'

// require('../css/app.scss')
// require('index.html')

// const ripple = new MDCRipple(document.querySelector('.foo-button'))
// const dialog = new MDCDialog(document.querySelector('.mdc-dialog'))
// const list = MDCList.attachTo(document.querySelector('.mdc-list'))
// list.wrapFocus = true

$(document).ready(function () {
  $('.block').each(function (index, blockElement) {
    let showDialogBtn = $(blockElement).find('.showDialogBtn')
    let dialog = new MDCDialog($(blockElement).find('.mdc-dialog')[0])
    showDialogBtn.on('click', function () {
      dialog.show()
    })
  })
})
const mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'))

var modal = document.getElementById('filter01')

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

