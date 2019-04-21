
const mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'))

var modal = document.getElementById('filter01')

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var searchpop = document.getElementById('search01')

window.onclick = function(event) {
    if (event.target == searchpop) {
        modal.style.display = "none";
    }
}