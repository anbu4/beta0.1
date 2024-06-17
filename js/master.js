fetch('https://anbu4.github.io/DataApp/data.json')
    .then(res=> res.json())
    .then(data =>{





// jsx fucntion
function creatSlaydCard(catigory,boxs,re='') {
    const slaydBox = document.querySelector('.slayd_box');
    const caption = document.querySelector('.caption');
    caption.innerHTML = localStorage.getItem('catigory');
    // slaydBox.classList.add(`.${boxs}`);
    let count = 0
    data[catigory].map(item => {
        count ++
        if(count > 7){
            return
        }
        const creatItem = document.createElement('a');
        creatItem.dataset.id = item.id
        creatItem.dataset.catigory = item.category
        creatItem.classList.add('slayd_card');
        creatItem.id = 'item' + re + count;
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
        creatItem.addEventListener('click', parseCard)
        slaydBox.append(creatItem)
    })
}
const itemObj = {}
function itemParsePages(catigory, genre){
    let count = 1
    itemObj['itemPage'+count] = [];

    if(genre == '' ||genre == null){
        data[catigory].forEach(item=>{
            if(itemObj['itemPage'+count].length >= 20){
                count++
                itemObj['itemPage'+count] = []
            }
            itemObj['itemPage'+count].push(item)
        })
        return
    }

    data[catigory].forEach(item=>{
        let v = item.genre.find(el=>el==genre);
        if(itemObj['itemPage'+count].length >= 16){
            count++
            itemObj['itemPage'+count] = []
        }
        if(v){itemObj['itemPage'+count].push(item)}
    })
}
function creatItemList(i){
    if(i==''){i=1}
    const itemContainer = document.querySelector('.item_container');
    itemContainer.innerHTML = ''
    itemObj['itemPage' + i].map(item => {
        // item
        const creatElem = document.createElement('a');
        creatElem.dataset.id = item.id;
        creatElem.dataset.catigory = item.category
        creatElem.classList.add('item');
        creatElem.href = 'move.html';
        let genre = item.genre.toString().replaceAll(",",",  ")
        creatElem.innerHTML = `
        <div class="item_img">
            <img src="${item.cardImg}" alt="">
        </div>
        <div class="item_content">
            <div class="item_con-title">${item.title}</div>
            <div class="item_con-dp">
            <p class="item_con-genre">${genre}</p>
            <b class="item_con-year">${item.year}</b>
            </div> 
        </div>
        `;
        creatElem.addEventListener('click', parseCard)
        // episodes
        if(item.episodes){
            const episodeNum = document.createElement('div')
            episodeNum.classList.add('item_series')
            // episodeNum.innerHTML = item.episodes + ' series';
            episodeNum.innerHTML = `<span>${item.episodes}</span>series`;
            creatElem.append(episodeNum)
        }
        itemContainer.append(creatElem)
    })

   
}
function creatPageNumber(length){
    const pageControlsNum = document.querySelector('.page_controls-num');
    const pageNumLocal = +localStorage.getItem('page');
    for(let num = 1;num<=length;num++){
        const itemNum = document.createElement('a');
        itemNum.href = 'master.html'
        itemNum.dataset.pageid = num;
        itemNum.innerHTML = num;
        itemNum.addEventListener('click', itemNumPageEvent);
        pageControlsNum.append(itemNum)
        if(num == pageNumLocal || num == 1 && pageNumLocal == 0){
            itemNum.classList.add('active_page')
        }
    }
}
creatSlaydCard(localStorage.getItem('catigory'));
itemParsePages(localStorage.getItem('catigory'), localStorage.getItem('genre'));
creatItemList(+localStorage.getItem('page'))
const itemObjLength = Object.keys(itemObj).length;
creatPageNumber(itemObjLength)
localStorage.setItem('page','')



// DOM
const slaydCards = document.querySelectorAll('.slayd_card')
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const genreBtn = document.querySelectorAll('.genre_btn');
const burger = document.querySelector('.burger');
const navbarMobileContent = document.querySelector('.navbar_mobile-content');
const pageBtnPlus = document.querySelector('.page_btn-plus');
const pageBtnMinus = document.querySelector('.page_btn-minus');
const filterContent = document.querySelector('.filter_content');
const filterBtn = document.querySelector('.filter_btn');
// 
let countPageii = 1


// Event
navSearchLink.addEventListener('click', () => {
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
pageBtnPlus.addEventListener('click',() =>{
    let pageNum = ++document.querySelector('.active_page').dataset.pageid;
    if(pageNum > itemObjLength){
       pageNum = 1;
    }
    localStorage.setItem('page',pageNum)

})
pageBtnMinus.addEventListener('click',() =>{
    let pageNum = --document.querySelector('.active_page').dataset.pageid;
    if(pageNum <= 0){
       pageNum = itemObjLength;
    }
    localStorage.setItem('page',pageNum)
})
filterBtn.addEventListener('click', () =>{
    filterContent.classList.toggle('filter_content-active')
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
    localStorage.setItem('catigory', this.dataset.catigory);
    localStorage.setItem('genre','');
}
function pullDataGenre(){
    if(this.dataset.catigory == undefined){
        return localStorage.setItem('genre', this.dataset.genre)
    }
    localStorage.setItem('genre', this.dataset.genre)
    localStorage.setItem('catigory', this.dataset.catigory)
}
function parseCard(){
    let catigory = this.dataset.catigory
    let id = this.dataset.id
    let value = data[catigory].find((el)=>el.id == id)
    localStorage.setItem('moveItem',JSON.stringify(value))
}
function itemNumPageEvent(){
   localStorage.setItem('page', this.dataset.pageid)
}


// Interval
setInterval(() => {
    eventSlayder(slaydCards)
}, 3200);

    })