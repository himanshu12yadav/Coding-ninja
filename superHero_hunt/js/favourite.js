const publickey1 = '6299478504c2372341a2c425a0f055f9';
const privatekey1 = '3728446e3af6e38c7d19fb9f314788ee9f5e3bed';




let timestamp = new Date().valueOf();
let md5 = CryptoJS.MD5(timestamp + privatekey1 + publickey1).toString();


let heros = document.getElementById('heros');

// const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publickey}&hash=${md5}`;

// get data from url below

async function getData(url){
    let response = await fetch(url);
    let json = await response.json();
    let data = await json.data;
    let result = await data.results;

    console.log(result);
    return result;
}

let favourite_list = JSON.parse(localStorage.getItem('favourite_list'));

// this fetch data according to the structure

favourite_list.forEach(id =>{
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`; 
    getData(url).then(index => {
        console.log(index)

        let div  = document.createElement('div');
        div.setAttribute("class", "card m-1");
        div.style.width = `${18}rem`;
        let card_body = document.createElement('div');
        card_body.setAttribute("class", "card-body");
        
        let h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.innerText = index[0].name;
        
        let img = document.createElement('img');
        img.className = 'img-fluid';
        img.style.aspectRatio = 1/1;
        img.src = `${index[0].thumbnail.path}.${index[0].thumbnail.extension}`;
    
    
        let anchor = document.createElement('a');
        anchor.className = 'btn btn-primary';
        anchor.href = `superhero.html?id=${index[0].id}"`
        anchor.dataset.characterid = `${index[0].id}`;
        anchor.target = "_blank";
        anchor.innerText = "SHOW MORE"
        
        div.appendChild(img);
        div.appendChild(card_body);
        card_body.appendChild(h5);
        card_body.appendChild(anchor)
    
        heros.insertAdjacentElement('afterbegin', div);
    
    });
})

// console.log(favourite_list[0])

document.addEventListener('click', function(e){

    if (e.target.textContent === 'Show More'){
        localStorage.setItem("id", e.target.dataset.characterid);
    }

});

