console.log("Welcome to Sangeet");

//Initializing the variables
let audioElement = new Audio('songs4/1.mp3');
let songIndex  = 0;
let myplay = document.getElementById('myplay');
let mastersongname = document.getElementById('mastersongname');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitem =  Array.from(document.getElementsByClassName('songitem'));

let songs4 = [
    {songName: "So High" , filePath:"songs4/1.mp3" , coverPath : "images4/s1.jpg"},
    {songName: "Nira Ishq" , filePath:"songs4/2.mp3" , coverPath : "images4/s2.jpg"},
    {songName: "Jee Karda" , filePath:"songs4/3.mp3" , coverPath : "images4/s3.jpg"},
    {songName: "Sharaabi" , filePath:"songs4/4.mp3" , coverPath : "images4/s4.jpg"},
    {songName: "Uncha Lamba Kad" , filePath:"songs4/5.mp3" , coverPath : "images4/s5.jpg"},
    {songName: "Mitraan Da Na" , filePath:"songs4/6.mp3" , coverPath : "images4/s6.jpg"},
]

mastersongname.innerText = songs4[songIndex].songName;

songitem.forEach((element, i )=> {
    element.getElementsByTagName("img")[0].src = songs4[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs4[i].songName;
});

//Handling the play and pause of the song
myplay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        myplay.classList.remove('fa-play-circle');
        myplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        myplay.classList.remove('fa-pause-circle');
        myplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate' , ()=>{
    //updating the progress bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myprogressbar.value = progress;
}
)

//updating current audio time when changing bar position
myprogressbar.addEventListener('change' , ()=>{
    audioElement.currentTime = myprogressbar.value*audioElement.duration/100;
})

const makeallplays = ( )=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
             element.classList.remove('fa-pause-circle');
             element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeallplays( );
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs4/${songIndex+1}.mp3`;
        mastersongname.innerText = songs4[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play( );
        gif.style.opacity = 1;
        myplay.classList.remove('fa-play-circle');
        myplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs4/${songIndex+1}.mp3`;
    mastersongname.innerText = songs4[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play( );
    myplay.classList.remove('fa-play-circle');
    myplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src =` songs4/${songIndex+1}.mp3`;
    mastersongname.innerText = songs4[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    myplay.classList.remove('fa-play-circle');
    myplay.classList.add('fa-pause-circle');
})

document.getElementById('space').addEventListener('click',()=>{
    if(audioElement.currentTime>=0)
    audioElement.currentTime = 2 + audioElement.currentTime;
})

document.getElementById('back').addEventListener('click',()=>{
    if(audioElement.currentTime>0)
    audioElement.currentTime = audioElement.currentTime - 2;
})