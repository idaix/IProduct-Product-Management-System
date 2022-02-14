// GET ELEMENTS
let nav__open = document.querySelector('.nav__open')
let nav__close = document.querySelector('.nav__close')
let nav = document.querySelector('.nav')

nav__open.addEventListener('click', ()=>{
    nav.style.display = "block"
})
nav__close.addEventListener('click', ()=>{
    nav.style.display = "none"
})