
// Elements HTML
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

// Audio music to play
const music = new Audio();

// List of songs
const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/1.jpg',
        artist: 'Hanu Dixit'
    },

    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX'
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos'
    },
]


let musicIndex = 0;

//boolean to control the music play or pause
let isPlaying = false;

// Play or pause music
function tooglePlay() {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

//Play music function
function playMusic() {
    isPlaying = true;

    // Change play button icon / Cambiar icono de reproducir musica
    playBtn.classList.replace('fa-play', 'fa-pause');

    //Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause music function
function pauseMusic() {
    isPlaying = false;

    // Change pause button icon / Cambiar icono de pausar musica
    playBtn.classList.replace('fa-pause', 'fa-play');

    //Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// load the information of the song playing
function loadMusic(song) {
    music.src = song.path; //route of the song on the assets
    title.textContent = song.displayName; //name of the song
    artist.textContent = song.artist; // artist of the song
    image.src = song.cover; // cover to display of the song
    background.src = song.cover; // background
}

// change the song function
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// function for display the progress of the song playing
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// funtion to set the progress bar value for the event button next or prev
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// events
playBtn.addEventListener('click', tooglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// load the music with the array songs
loadMusic(songs[musicIndex]);

