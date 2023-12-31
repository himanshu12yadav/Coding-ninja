const publickey1 = '6299478504c2372341a2c425a0f055f9';
const privatekey1 = '3728446e3af6e38c7d19fb9f314788ee9f5e3bed';



let timestamp = new Date().valueOf();
let md5 = CryptoJS.MD5(timestamp + privatekey1 + publickey1).toString();

let characterId = localStorage.getItem('id');

// below are the end point for api we using
const character = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`;
let comics = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`;
let series = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/series?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`;
let events = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/events?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`;


// accessing a tag in html file

let title = document.getElementById('title');
let comics_collection = document.getElementById('comics_collection');
let events_collection = document.getElementById('events_collection');
let series_collection = document.getElementById('series_collection');
let thumbnail = document.getElementById('thumbnail');



// extract a data from end point

async function getData(url){

    let response = await fetch(url);
    let json = await response.json();
    let data = await json.data;
    let result = await data.results;
    return result;
}

// display a structure with information

getData(character).then(result=> { 

    let html = `
         <div class="col-lg-4 col-md-8 m-auto">
         <h2 class="text-center">${result[0].name}</h2>    
         <img class="img-fluid rounded" src="${result[0].thumbnail.path}.${result[0].thumbnail.extension}">
        </div>
    `;

    thumbnail.insertAdjacentHTML('afterbegin', html);

});

// display comics for character selected

function getComics(comics){
    getData(comics).then(result => {

        if (result.length !== 0){
            for (let el of result){
                let img = '';
                if (el.images.length !== 0){
                    img = `${el.images[0].path}.${el.images[0].extension}`;
                }else{
                    continue;
                }
                
                let div = document.createElement('div');
                div.setAttribute('class','card m-1');
                div.style.width = 20 + 'rem';

                let card_body = document.createElement('div');
                card_body.setAttribute('class', "card-body");
              
                let imgElement = document.createElement('img');
                imgElement.className = 'img-fluid';
                imgElement.style.aspectRatio = 1/1;
                let h5 = document.createElement('h5');
                h5.className = 'card-title';
                h5.innerText = `${el.title}`;
                imgElement.src = `${img}`;

                div.appendChild(imgElement);
                div.appendChild(card_body);
                card_body.appendChild(h5);

            comics_collection.insertAdjacentElement('afterbegin', div);
            }
        }else{

            comics_collection.insertAdjacentHTML('afterbegin', '<h1 class="text-center" style="color:white;padding:4rem"; > NO COMIC AVAILABLE </h1>');  
    
        }

       });    
}


// display event for a character

function getEvents(events){
    getData(events).then(result =>{

     if (result.length !== 0){
        for (let el of result){
          let thumbnail = '';
          if (el.thumbnail?.path !== 'undefined'){
            thumbnail = `${el.thumbnail.path}.${el.thumbnail.extension}`;
          }else{
            continue;
          }

          let div = document.createElement('div');
          div.className = 'card m-1';
          div.style.width = `${18}rem`;
          let card_body = document.createElement('div');
          let imgElment = document.createElement('img');
          let h5 = document.createElement('h5');
          h5.setAttribute('class', 'card-title');
          h5.className = 'card-title';
          h5.innerText = `${el.title}`;
          imgElment.src = `${thumbnail}`;

          div.appendChild(imgElment);
          div.appendChild(card_body);
          card_body.appendChild(h5);

      events_collection.insertAdjacentElement('afterbegin', div);


      events_collection.insertAdjacentElement('afterbegin', div);

        }
    
        }else{

        events_collection.insertAdjacentHTML('afterbegin', '<h1 class="text-center" style="color:white;padding:4rem"; > NO EVENT AVAILABLE </h1>');  
    
    }

    
    });
}

// display series

function getSeries(series){
    getData(series).then(result => {
        
        if (result.length !== 0){
            for (let el of result){
                
                let thumbnail = '';
                if (el.thumbnail !== 'undefined' || el.thumbnail.length !== 0){
                    thumbnail = `${el.thumbnail.path}.${el.thumbnail.extension}`;
                }

                   
                let div = document.createElement('div');
                div.setAttribute('class','card m-2');
                div.style.width = `${18}rem`;

                let card_body = document.createElement('div');
                card_body.setAttribute('class', "card-body");
              
                let imgElment = document.createElement('img');
                imgElment.setAttribute('class', 'img-fluid');
                imgElment.style.aspectRatio = 1/1;
                let h5 = document.createElement('h5');
                h5.className = 'card-title';
                h5.innerText = `${el.title}`;
                imgElment.src = `${thumbnail}`;

                div.appendChild(imgElment);
                div.appendChild(card_body);
                card_body.appendChild(h5);

           
                series_collection.insertAdjacentElement('afterbegin', div);
            }
        }else{
            series_collection.insertAdjacentHTML('afterbegin', '<h1 class="text-center" style="color:white;padding:4rem"; > NO SERIES AVAILABLE </h1>');  
    
        }
    });
}

getSeries(series);
getEvents(events);
getComics(comics);
