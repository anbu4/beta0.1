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
        creatItem.addEventListener('click', function(){
            localStorage.setItem('moveItem',JSON.stringify(item))
        })
        slaydBox.append(creatItem)
    })
}
function createRecapCard(arr, boxs, re='') {
    const slaydBox = document.querySelector('.recap_card-slayd');

    arr.map(item => {    
        const creatItem = document.createElement('a');
        creatItem.dataset.id = item.id
        creatItem.classList.add('slayd_card');
        creatItem.id = 'item' + re + item.id;
        creatItem.href = 'moveRecap.html';
        creatItem.innerHTML = ` 
        <div class="slayd_item">
            <img src="${item.slaydImg}" alt="">
            <div class="slayd_card-content">
                  <h5 class="slayd_card-title">${item.title}</h5>
            </div>
        </div>`
        creatItem.addEventListener('click', function(){
            localStorage.setItem('recapItem',JSON.stringify(item))
        })
        slaydBox.append(creatItem)
    })
}
creatSlaydCard(data.film ,'film_card-slayd');
creatSlaydCard(data.serial , 'serial_card-slayd','Re');
creatSlaydCard(data.anime, 'anime_card-slayd');
creatSlaydCard(data.cartoon, 'cartoon_card-slayd', 'Re');
createRecapCard(data.recap)



// DOM
const filmSlaydCards = document.querySelector('.film_card-slayd').querySelectorAll('.slayd_card');
const serialSlaydCards = document.querySelector('.serial_card-slayd').querySelectorAll('.slayd_card');
const animeSlaydCards = document.querySelector('.anime_card-slayd').querySelectorAll('.slayd_card');
const cartonSlaydCards = document.querySelector('.cartoon_card-slayd').querySelectorAll('.slayd_card');
const recapSlaydCards = document.querySelector('.recap_card-slayd').querySelectorAll('.slayd_card');



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
.catch(err =>{
        document.body.innerHTML = `
        <h1>404:Error</h1>
        `
        console.log(err);
});


localStorage.setItem('episodeNum', '');
localStorage.removeItem('scrollEp');
localStorage.removeItem('genre');
localStorage.removeItem('catigory');
localStorage.removeItem('page');
localStorage.removeItem('language');
