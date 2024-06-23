
// DOM
const navSearchLink = document.querySelector('.nav_search-link');
const navbarInput = document.querySelector('.navbar_input');
const navLinks = document.querySelectorAll('.nav_links');
const genreBtn = document.querySelectorAll('.genre_btn');
const header = document.querySelector('.header');
let itemObj = JSON.parse(localStorage.getItem('moveItem'));
const burger = document.querySelector('.burger');
const navbarMobileContent = document.querySelector('.navbar_mobile-content');
const videoIframe = document.querySelector('.video_iframe');
const videoBoxBg = document.querySelector('.video_box-bg img')





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
                <ul>Genre:</ul>
                <p class="head_genre-volue">${genre}</p>
            </div>
            <div class="head_year">
                <ul>Year:</ul>
                <p class="head_year-volue">${itemObj.year}</p>
            </div>
            <div class="head_genre head_episode">
                <ul>Episodes:</ul>
                <p class="head_genre-volue">${itemObj.episodes}</p>
            </div>
            <div class="head_year">
                <ul>Country:</ul>
                <p class="head_year-volue">${itemObj.count}</p>
            </div>
            <div class="head_description">
                <ul>Summary:</ul>
                <img class="burger_summary" src="Icons/left-chevron.png">
                <li class="head_description-volue">${itemObj.summary}</li>
            </div>
        </div>
    </div>
    
    `;
    if(itemObj.episodes == undefined || itemObj.episodes == ''){
        header.querySelector('.head_episode').remove()
    }
    if(itemObj.summary == undefined || itemObj.summary == ''){
        header.querySelector('.head_description').remove()
    }
}
function creatVideo(){
    if(typeof itemObj.videoUrl == 'object'){
        let count = localStorage.getItem('episodeNum')
        if(count == null || count == ''){count = 1}
        videoIframe.src = itemObj.videoUrl[count];  
        videoBoxBg.src = itemObj.slaydImg;
        return
    }
    videoIframe.src = itemObj.videoUrl;
    videoBoxBg.src = itemObj.slaydImg;

}
function creatNumEpisode(){
    const episodeNumBox = document.querySelector('.episode_num-box');
    let num = localStorage.getItem('episodeNum')
    if(itemObj.episodes == undefined){ return episodeNumBox.remove()};

    for(let i = 1; i <= itemObj.episodes; i++){
        const btnNum = document.createElement('a');
        btnNum.href = 'move.html'
        btnNum.addEventListener('click',function(){localStorage.setItem('episodeNum', i)});
        btnNum.innerHTML = i;
        if(num == null || num == '' && i == 1){
            btnNum.classList.add('episode_num-active')
        }
        if(num == i){
            btnNum.classList.add('episode_num-active')
        }
        episodeNumBox.append(btnNum);
    }

    // scroll
    episodeNumBox.scrollLeft = localStorage.getItem('scrollEp')
    episodeNumBox.addEventListener('scroll',function(){
        localStorage.setItem('scrollEp', episodeNumBox.scrollLeft)
    })
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



