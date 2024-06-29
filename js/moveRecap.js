const recapHeader = document.querySelector('.recap_header');
const recapVideoIframe = document.querySelector('.recap_video-iframe');


const localItem = JSON.parse(localStorage.getItem('recapItem'))
function pushData(){
    recapHeader.innerHTML = `
    <img src="${localItem.slaydImg}">
    <div class="recap_content">
    <h2 class="recap_title">${localItem.title}</h2>
    <p class="recap_channel">Channal: <span>${localItem.channel}</span></p>
    <ul class="recap_language">Language: <span>${localItem.language}</span></ul>
    </div>
    `
    recapVideoIframe.src = localItem.videoUrl
}
pushData()