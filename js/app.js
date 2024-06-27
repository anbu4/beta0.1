// Dom
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const navLinksMobile = document.querySelectorAll('.nav_links-mobile');
const genreBtn = document.querySelectorAll('.genre_btn');

// Event
navSearchLink.addEventListener('click', () =>{
    navbarInput.classList.toggle('input_active')
})
navLinks.forEach(link =>{
    link.addEventListener('click',pullDataCatigory)
})
navLinksMobile.forEach(link =>{
    link.addEventListener('click',pullDataCatigory)
})
genreBtn.forEach(btn =>{
    btn.addEventListener('click', pullDataGenre)
})
// function
function pullDataCatigory(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre','')
}
function pullDataGenre(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre', this.dataset.genre)
}


const searchInput = document.querySelector('.nav_input')
searchInput.addEventListener('keypress', function(e){
        if(e.which === 13){
          e.preventDefault();
            alert('Poisk ne rabotaet vremeno');
      }
});