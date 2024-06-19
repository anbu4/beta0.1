fetch('https://anbu4.github.io/DataApp/data.json')
    .then(res=> res.json())
    .then(data =>{
        

    
// jsx fucntion
function creatSlaydCard(arr, boxs, re='') {
    const slaydBox = document.querySelector(`.${boxs}`);

    arr.map(item => {    
        const creatItem = document.createElement('a');
        creatItem.dataset.id = item.id
        creatItem.dataset.catigory = item.category
        creatItem.classList.add('slayd_card');
        creatItem.id = 'item' + re + item.id;
        creatItem.href = 'move.html';
        creatItem.innerHTML = ` 
        <div class="slayd_item">
            <img src="${item.slaydImg}" alt="">
            <div class="slayd_card-content">
                  <h5 class="slayd_card-title">${item.title}</h5>
                  <div>
                      <p class="slayd_card-genres">${item.genre[0]}, ${item.genre[1]}</p>
                      <p class="slayd_card-year">${item.year}</p>
                  </div>
            </div>
        </div>`
        creatItem.addEventListener('click', slaydDataPush)
        slaydBox.append(creatItem)
    })
}
        creatSlaydCard(data.film ,'film_card-slayd');
        creatSlaydCard(data.serial , 'serial_card-slayd','Re');
        creatSlaydCard(data.anime, 'anime_card-slayd');


// DOM
const filmSlaydCards = document.querySelector('.film_card-slayd').querySelectorAll('.slayd_card');
const serialSlaydCards = document.querySelector('.serial_card-slayd').querySelectorAll('.slayd_card');
const animeSlaydCards = document.querySelector('.anime_card-slayd').querySelectorAll('.slayd_card');
const cartonSlaydCards = document.querySelector('.carton_card-slayd').querySelectorAll('.slayd_card');
const recapSlaydCards = document.querySelector('.recap_card-slayd').querySelectorAll('.slayd_card');
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const genreBtn = document.querySelectorAll('.genre_btn');
const burger = document.querySelector('.burger');
const navbarMobileContent = document.querySelector('.navbar_mobile-content');


// Event
navSearchLink.addEventListener('click', () =>{
    navbarInput.classList.toggle('input_active')
})
navLinks.forEach(link =>{
    link.addEventListener('click',pullDataCatigory)
})
genreBtn.forEach(btn =>{
    btn.addEventListener('click', pullDataGenre)
})
burger.addEventListener('click',() =>{
    navbarMobileContent.classList.toggle('nav_mobile-active')
})
// function
function eventSlayder(slaydBoxCards) {
    slaydBoxCards.forEach(function (card) {
        let i = card.id.replace(/[A-z]/g, '')
        let ii = --i
        if (ii < 1) {
            ii = 7
        }
        card.id = card.id.replace(/.$/, ii);
    })
}
function pullDataCatigory(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre','')
}
function pullDataGenre(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre', this.dataset.genre)
}
function slaydDataPush(){
    let catigory = this.dataset.catigory;
    let id = this.dataset.id;
    let value = data[catigory].find((el)=>el.id == id)
    localStorage.setItem('moveItem',JSON.stringify(value))
}
// setInterval
setInterval(() => {
    eventSlayder(filmSlaydCards)
}, 3200);

setInterval(() => {
    eventSlayder(serialSlaydCards)
}, 4700);

setInterval(() => {
    eventSlayder(animeSlaydCards)
}, 5500);

setInterval(() => {
    eventSlayder(cartonSlaydCards)
}, 6200);

setInterval(() => {
    eventSlayder(recapSlaydCards)
}, 7500);

    })