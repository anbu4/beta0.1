fetch('https://anbu4.github.io/DataRecap/recap.json')
    .then(res=> res.json())
    .then(arr =>{
        const arrRev = arr.toReversed()
        const recapContainer = document.querySelector('.recap_container');
        recapContainer.innerHTML = ''
        

        let ii = 0
        let length = arrRev.length
        let iter = 20

        function createRecapCard(){
            for(let i = ii; i <= iter; i++){
                if(i> iter) break
                const card = document.createElement('a');
                card.href = 'moveRecap.html'
                card.classList.add('recap_card');
                card.innerHTML = `
                <img src="${arrRev[i].slaydImg}">
                    <div>
                        <p>${arrRev[i].title}</p>
                    </div>
                    <ul class="recap_len">${arrRev[i].language}</ul>
                `;
                card.addEventListener('click',function(){
                    localStorage.setItem('recapItem',JSON.stringify(arrRev[i]))
                })
                recapContainer.append(card);
                ii++
            }
            if(length-iter > 20){
                iter += 20
            }else if(length-iter <= 20){
                iter += length-iter
            }
        }
        createRecapCard()
        // Event
        window.addEventListener('scroll',function(){
            const docRect = document.documentElement.getBoundingClientRect();
            if(docRect.bottom <= document.documentElement.clientHeight + 700){
                createRecapCard()
            }
        })
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