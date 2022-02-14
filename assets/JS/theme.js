let selectTheme = document.querySelectorAll("#select-theme")

if(localStorage.getItem('theme')){
    document.body.classList.add(localStorage.getItem('theme'))
}

selectTheme.forEach((e)=>{
    e.addEventListener('change', ()=>{
        document.body.classList.value = ''
        document.body.classList.add(e.value)
        localStorage.setItem('theme', e.value)
    })
})