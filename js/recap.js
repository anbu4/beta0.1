fetch('https://anbu4.github.io/DataRecap/recap.json')
    .then(res=> res.json())
    .then(arr =>{
        const recapContainer = document.querySelector('.recap_container');

        function createRecapCard(){
            arr.forEach(item => {
                const card = document.createElement('a');
                card.href = 'moveRecap.html'
                card.classList.add('recap_card');
                card.innerHTML = `
                <img src="${item.slaydImg}">
                    <div>
                        <p>${item.title}</p>
                    </div>
                    <ul class="recap_len">${item.language}</ul>
                `;
                card.addEventListener('click',function(){
                    localStorage.setItem('recapItem',JSON.stringify(item))
                })
                recapContainer.prepend(card);
            });
        }
        createRecapCard()

    })
    
    .catch(err =>{
        document.body.innerHTML = `
        <h1>Сервер перегружен или не отвечает</h1>
        <h2>Перезагрузите или передите на главную</h2>
        <a href="index.html" class="nav_logo-link">
            <img class="logo-link_img" src="Icons/cinema.png" alt="">
        </a>
        `
        console.log(err);
})