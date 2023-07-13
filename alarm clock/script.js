
/** DOM access */

let audio;
let clock = document.getElementById('clock');
let hourUI = document.getElementById('hour');
let minuteUI = document.getElementById('minute');
let secondUI = document.getElementById('second');
let fileUI = document.getElementById('audio_input');
let btn = document.getElementById("btn");
let selectTag = document.getElementsByClassName('select');
let timezoneUI = document.getElementById('timezone');

let hours = 0;
let minutes = 0;
let second = 0;

/** below are user variable which store a value given by user */ 

let userHour;
let userMinute;
let userSecond;
let fileInput;
let userTimezone;


/** setting value of user variable which are given by user by using event listener */ 

hourUI.addEventListener('change', function(e){
    e.preventDefault();
    userHour = e.target.value;
});

minuteUI.addEventListener('change', function(e){
    e.preventDefault();
    userMinute = e.target.value;
});

secondUI.addEventListener('change', (e)=>{
    e.preventDefault();
    userSecond = e.target.value;
});

timezoneUI.addEventListener('change', (e)=>{
    e.preventDefault();
    userTimezone = e.target.value;
});

fileUI.addEventListener('change', (e)=>{
    e.preventDefault();
    fileInput = e.target.value;
});


/** Setting a event listener to button which confirm that it set. */ 

btn.addEventListener('click', function(){

    if (this.textContent === 'SET ALARM'){
        for (let i=0; i < selectTag.length; i++){
            selectTag[i].setAttribute("disabled",true);
        }
        this.textContent = 'RESET';
        active = true;
    }else{

        for (let j=0; j < selectTag.length; j++){
            selectTag[j].removeAttribute("disabled");
        }

        hourUI.children[0].setAttribute("selected", 0);
        minuteUI.children[0].setAttribute("selected", 0);
        secondUI.children[0].setAttribute("selected", 0);
        fileUI.value = "";
        this.textContent = 'SET ALARM';
        audio.pause();

    }
});

/* This function regulate present time and check whether CURRENT TIME equal to 
   given time so that it call the alarm function. 
*/

function currentTime(){
    let date = new Date();
    hours = date.getHours();
    minutes = date.getMinutes();
    second = date.getSeconds();
    let timezone = 'AM'; 
    if (hours > 12){
        hours = Math.abs(12 - hours);
        timezone = 'PM';
    }
    time = `${hours <= 9 ? '0' + hours : hours} : ${minutes <= 9 ? '0' + minutes : minutes } : ${second <= 9 ? '0'+ second : second} : ${timezone}`;
    clock.innerText = time;
    if (+userHour === hours && +userMinute === minutes && +userSecond === second && userTimezone === timezone){
        if (active){
            alarm();
        }
    }
}

/**
 * This function play a particular song which are specified by user
 */

function alarm(){
    audio = new Audio();
    audio.src = URL.createObjectURL(fileUI.files[0]);
    audio.play();
}

let setIntervalId = setInterval(currentTime,1000);
