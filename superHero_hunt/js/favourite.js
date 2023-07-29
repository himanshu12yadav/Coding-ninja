
const publickey = '01e80748a8fdf0fdd8a9765da51f2ced';
const privatekey = 'd7603090ceebbc48efd87944dbc047bc77448cf4';

const publickey1 = '6299478504c2372341a2c425a0f055f9';
const privatekey1 = '3728446e3af6e38c7d19fb9f314788ee9f5e3bed';




let timestamp = new Date().valueOf();
let md5 = CryptoJS.MD5(timestamp + privatekey1 + publickey1).toString();


let heros = document.getElementById('heros');

// const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=${timestamp}&apikey=${publickey}&hash=${md5}`;

async function getData(url){
    let response = await fetch(url);
    let json = await response.json();
    let data = await json.data;
    let result = await data.results;

    console.log(result);
    return result;
}

let favourite_list = JSON.parse(localStorage.getItem('favourite_list'));
console.log(favourite_list);


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
        
/*    
        let icon = document.createElement('i');
     
        icon.className = `${index.like ? 'fa-solid fa-regular fa-heart' : 'fa-regular fa-heart'}`;
        icon.setAttribute('data-favourite', `${index[0].id}`);
        icon.id = "icon";
    
        icon.addEventListener('click', function(){
            console.log(index[0].like, " ", set);
            if (!index.like){
                icon.className = 'fa-solid fa-regular fa-heart';
                list.push(icon.dataset.favourite);
                localStorage.setItem("favourite_list", JSON.stringify(list));
                index.like = true;
                set = false;
                localStorage.setItem('fetchData', JSON.stringify(result));
            }else {
                icon.className ='fa-regular fa-heart';
                let iconIndex = list.findIndex(el => el === icon.dataset.favourite);
                list.splice(iconIndex, 1);
                localStorage.setItem('favourite_list', JSON.stringify(list));
                index.like = false;
                set = true;
                localStorage.setItem('fetchData', JSON.stringify(result));
            }
   
    
            console.log("index", index);
        });
    */
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
        console.log(e.target.textContent);
        localStorage.setItem("id", e.target.dataset.characterid);
    }

});

