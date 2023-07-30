// public and private key for api
const publickey1 = '6299478504c2372341a2c425a0f055f9';
const privatekey1 = '3728446e3af6e38c7d19fb9f314788ee9f5e3bed';

let timestamp = new Date().valueOf();
let md5 = CryptoJS.MD5(timestamp + privatekey1 + publickey1).toString();


let heros = document.getElementById('heros');
let search_text = document.getElementById('search_text');


const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publickey1}&hash=${md5}`;

let pre = await JSON.parse(localStorage.getItem('fetchData'));
var f;
if (pre){
    f = pre;  
}else{
    f = [];
}


// This function extract data from url.
async function getData(){
        if (localStorage.getItem('fetchData') === null){
            let response = await fetch(url);
            let json = await response.json();
            let data = await json.data;
            let result = await data.results;
    
            result.forEach(el => el.like = false);
            result.forEach(el => f.push(el));
            localStorage.setItem('fetchData', JSON.stringify(f));
            return result;
        }else{
            let result = await JSON.parse(localStorage.getItem('fetchData'));
            return result;
        }        
}



let set = true;

getData().then(result => {
    let list = [];
    result.forEach(index => {
        let div  = document.createElement('div');
        let card_body = document.createElement('div');
        card_body.setAttribute("class", "card-body")
        div.setAttribute("class", "card m-1");
        div.style.width = 20 + 'rem';

        let h5 = document.createElement('h5');
        h5.className= 'card-title';
        h5.innerText = index.name;

        let img = document.createElement('img');
        img.className = 'img-fluid card-img-top';
        img.style.aspectRatio = '1/1';
        img.src = `${index.thumbnail.path}.${index.thumbnail.extension}`;
    
    
        let anchor = document.createElement('a');
        anchor.className = 'btn btn-primary';
        anchor.href = `superhero.html?id=${index.id}"`
        anchor.dataset.characterid = `${index.id}`;
        anchor.setAttribute("target", "_blank");
        anchor.innerText = "SHOW MORE";
        
    
        let icon = document.createElement('i');
     
        icon.className = `${index.like ? 'fa-solid fa-regular fa-heart' : 'fa-regular fa-heart'}`;
        icon.setAttribute('data-favourite', `${index.id}`);
        icon.id = "icon";
    
        icon.addEventListener('click', function(){
            if (!index.like){
                icon.className = 'fa-solid fa-regular fa-heart';
                list.push(icon.dataset.favourite);
                localStorage.setItem("favourite_list", JSON.stringify(list));
                set = false;
                index.like = true;
                localStorage.setItem('fetchData', JSON.stringify(result));
            }else{
                // console.log("Esles");
                icon.className ='fa-regular fa-heart';
                console.log(icon.dataset.favourite);
                let iconIndex = list.findIndex(el => el === icon.dataset.favourite);
                if (iconIndex !== -1){
                    console.log(iconIndex);
                    list.splice(iconIndex, 1);
                    localStorage.setItem('favourite_list', JSON.stringify(list));
                    set = true;
                    index.like = false;
                    localStorage.setItem('fetchData', JSON.stringify(result));
                }

            }
        
   
        });

        card_body.appendChild(h5);
        card_body.appendChild(anchor);
        card_body.appendChild(icon);

        div.appendChild(img);
        div.appendChild(card_body);

        heros.insertAdjacentElement('afterbegin', div);
    
    });

    search_text.addEventListener('input', function(){
        if (this.value === ""){
            result.forEach(index =>{
                
                let div  = document.createElement('div');
                div.setAttribute("class", "box");
                
                let h3 = document.createElement('h3');
                h3.innerText = index.name;    
            
                let img = document.createElement('img');
                img.classList.add('img_responsive');
                img.src = `${index.thumbnail.path}.${index.thumbnail.extension}`;
            
            
                let anchor = document.createElement('a');
                anchor.href = `superhero.html?id=${index.id}"`
                anchor.dataset.characterid = `${index.id}`;
                anchor.setAttribute("target", "_blank");
                anchor.innerText = "SHOW MORE"
                
            
                let icon = document.createElement('i');
                icon.className = 'fa-regular fa-heart';
                icon.setAttribute('data-favourite', `${index.id}`);
                icon.id = "icon";
            
                icon.addEventListener('click', function(){
                    console.log(index.like, " ", set);
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
            
               
                div.appendChild(h3);
                div.appendChild(img);
                div.appendChild(icon);
                div.appendChild(anchor);
            
                heros.insertAdjacentElement('afterbegin', div);

            });
        }

        if (this.value !== ""){
           clearScreen(); 
           let ans = result.filter(({id, name})=> search_text.value.toLowerCase() === name.toLowerCase());
           ans.forEach(index =>{
            
            let div  = document.createElement('div');
            let card_body = document.createElement('div');
            card_body.setAttribute("class", "card-body")
            div.setAttribute("class", "card m-1");
            div.style.width = 20 + 'rem';
    
            let h5 = document.createElement('h5');
            h5.className= 'card-title';
            h5.innerText = index.name;
    
            let img = document.createElement('img');
            img.className = 'img-fluid card-img-top';
            img.style.aspectRatio = '1/1';
            img.src = `${index.thumbnail.path}.${index.thumbnail.extension}`;
        
        
            let anchor = document.createElement('a');
            anchor.className = 'btn btn-primary';
            anchor.href = `superhero.html?id=${index.id}"`
            anchor.dataset.characterid = `${index.id}`;
            anchor.setAttribute("target", "_blank");
            anchor.innerText = "SHOW MORE";
            
        
            let icon = document.createElement('i');
         
            icon.className = `${index.like ? 'fa-solid fa-regular fa-heart' : 'fa-regular fa-heart'}`;
            icon.setAttribute('data-favourite', `${index.id}`);
            icon.id = "icon";
        
            icon.addEventListener('click', function(){
                if (!index.like){
                    icon.className = 'fa-solid fa-regular fa-heart';
                    list.push(icon.dataset.favourite);
                    localStorage.setItem("favourite_list", JSON.stringify(list));
                    set = false;
                    index.like = true;
                    localStorage.setItem('fetchData', JSON.stringify(result));
                }else{
                    // console.log("Esles");
                    icon.className ='fa-regular fa-heart';
                    console.log(icon.dataset.favourite);
                    let iconIndex = list.findIndex(el => el === icon.dataset.favourite);
                    if (iconIndex !== -1){
                        console.log(iconIndex);
                        list.splice(iconIndex, 1);
                        localStorage.setItem('favourite_list', JSON.stringify(list));
                        set = true;
                        index.like = false;
                        localStorage.setItem('fetchData', JSON.stringify(result));
                    }
    
                }
            
       
            });
    
            card_body.appendChild(h5);
            card_body.appendChild(anchor);
            card_body.appendChild(icon);
    
            div.appendChild(img);
            div.appendChild(card_body);
    
            heros.insertAdjacentElement('afterbegin', div);

        

           }); 
        }
    });

});

// function cleared when their search

function clearScreen(){
    heros.innerHTML = "";
    return;
}


// This function set localStorage key and value pair 

document.addEventListener('click', function(e){

    if (e.target.textContent === 'SHOW MORE'){
        console.log(e.target.textContent);
        localStorage.setItem("id", e.target.dataset.characterid);
    }

});


