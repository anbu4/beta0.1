
// DOM
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const genreBtn = document.querySelectorAll('.genre_btn');
const header = document.querySelector('.header');
let itemObj = JSON.parse(localStorage.getItem('moveItem'));
const burger = document.querySelector('.burger');
const navbarMobileContent = document.querySelector('.navbar_mobile-content');
const video = document.querySelector('.video');




// jsx
function creatHeader(){
    let genre = itemObj.genre.toString().replaceAll(",",",  ")
    header.innerHTML = `
    <div class="header_item-img">
        <img src="${itemObj.cardImg}" alt="">
    </div>
    <div class="header_item-content">
        <h1 class="header_title">${itemObj.title}</h1>
        <div class="header_content">
            <div class="head_genre">
                <ul>Жанр:</ul>
                <p class="head_genre-volue">${genre}</p>
            </div>
            <div class="head_year">
                <ul>Год:</ul>
                <p class="head_year-volue">${itemObj.year}</p>
            </div>
            <div class="head_year">
                <ul>Страна:</ul>
                <p class="head_year-volue">${itemObj.count}</p>
            </div>
            <div class="head_description">
                <ul>Опсисания:</ul>
                <img class="burger_summary" src="Icons/left-chevron.png">
                <li class="head_description-volue">${itemObj.summary}</li>
            </div>
        </div>
    </div>
    `
}
function creatVideo(count=1){
    if(typeof itemObj.videoUrl == 'object'){
        video.innerHTML = itemObj.videoUrl[count];  
        console.log(count);
        return
    }
    video.innerHTML = itemObj.videoUrl;
}
function creatNumEpisode(){
    const episodeNumBox = document.querySelector('.episode_num-box');
    if(itemObj.episodes == undefined){ return episodeNumBox.remove()};
    for(let i = 1; i <= itemObj.episodes; i++){
        const btnNum = document.createElement('button');
        btnNum.addEventListener('click',function(){creatVideo(i)});
        btnNum.innerHTML = i;
        episodeNumBox.append(btnNum)
    }

}
creatHeader()
creatVideo()
creatNumEpisode()

// jsxDom
const burgerSummary = document.querySelector('.burger_summary');
const headSummary = document.querySelector('.head_description-volue');

// Event
navSearchLink.addEventListener('click', () => {
    navbarInput.classList.toggle('input_active');
})
navLinks.forEach(link =>{
    link.addEventListener('click',pullDataCatigory);
})
genreBtn.forEach(btn =>{
    btn.addEventListener('click', pullDataGenre)
})
burgerSummary.addEventListener('click', () => {
    headSummary.classList.toggle('flex');
})
burger.addEventListener('click',() =>{
    navbarMobileContent.classList.toggle('nav_mobile-active')
})


// function
function pullDataCatigory(){
    localStorage.setItem('catigory', this.dataset.catigory);
    localStorage.setItem('genre','');
}
function pullDataGenre(){
    localStorage.setItem('catigory', this.dataset.catigory)
    localStorage.setItem('genre', this.dataset.genre)
}


