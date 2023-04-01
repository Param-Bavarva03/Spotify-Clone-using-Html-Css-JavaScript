console.log('Wlcome to js');

let songindex=0;
let audioele= new Audio('song.mp3');
let masterplay= document.getElementById('masterplay');
let myprogressbar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let mastersongname= document.getElementById('mastersongname');
let songitems= Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songname:'Ashqui-2-Salman', filepath:'1.mp3', coverpath:'cover1.jpg'},
    {songname:'Makhana-Mp3-Original', filepath:'2.mp3', coverpath:'cover2.webp'},
    {songname:'Love-minanti-Mp3', filepath:'3.mp3', coverpath:'cover3.jfif'},
    {songname:'Main-Royan-Original', filepath:'4.mp3', coverpath:'cover4.jfif'},
    {songname:'kuchh-bhi-...', filepath:'5.mp3', coverpath:'cover5.jfif'},
    {songname:'Rabata-With-Dj_PB', filepath:'song.mp3', coverpath:'cover.jfif'}
]

songitems.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src= songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText= songs[i].songname;
})

// audioele.play();

//handle play/push
masterplay.addEventListener('click',()=>{
    if(audioele.paused || audioele.currentTime<=0)
    {
        audioele.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity =1;
    }
    else{
        audioele.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity =0;
    }
})

//listen to events
audioele.addEventListener('timeupdate',()=>{
    // console.log('time update');
    //update seekbar
    progress= parseInt((audioele.currentTime/audioele.duration)*100);
    // console.log(progress);
    myprogressbar.value= progress;
})

myprogressbar.addEventListener('change',()=>{

    audioele.currentTime = myprogressbar.value * audioele.duration/100;
})

const makeallplays= ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeallplays();
        songindex= parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        mastersongname.innerText=songs[songindex].songname;
        audioele.src=`${songindex+1}.mp3`;
        audioele.currentTime=0;
        audioele.play();
        gif.style.opacity =1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=5)
    songindex=0;
    else
    songindex+=1;

    audioele.src=`${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
    audioele.currentTime=0;
    audioele.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0)
    songindex=0;
    else
    songindex-=1;

    audioele.src=`${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
    audioele.currentTime=0;
    audioele.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})