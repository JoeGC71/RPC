const songList = [{
    title: "All Girls Are The Same",
    file: "All girl.mp3",
    cover: "img-1.jpg"
},
{
    title: "Back in Black",
    file: "Bad.mp3",
    cover: "img-2.jpg"
}, {
    title: "Barracuda",
    file: "barracuda.mp3",
    cover: "img-3.jpg"
},{
    title: "Amapolas",
    file: "1xto.mp3",
    cover: "img-4.jpg"
},{
title: "To Rule The World",
    file: "pluma.mp3",
    cover: "img-5.jpg"
}]
// Canción actual
let actualSong = null;

// Elementos DOM
const songs = document.querySelector(".songs"),
    audio = document.getElementById("audio"),
    cover = document.querySelector(".cover"),
    title = document.querySelector(".title"),
    play = document.getElementById("play"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next"),
    progress = document.getElementById("progress"),
    progressContainer= document.getElementById("progress-container"),
    time= document.querySelector(".currentTime");
    duracion = document.querySelector(".duration")
    progressContainer.addEventListener("click",setProgress);
    // Escuchar el elemnto audio
    audio.addEventListener("timeupdate",updateProgress)
// Escuchar click en el boton play
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong();

    } else {
        pauseSong();
    }
})
next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones

loadSongs = () => {
    // Crear un elemnto LI
    songList.forEach((song, index) => {

        // Crear li
        const li = document.createElement("li");
        // 
        // Crear a
        const link = document.createElement("a");
        link.href = "#";
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index));
        // 
        // 
        // Hidratar a
        link.textContent = song.title;
        // 
        // Añadir a li
        li.appendChild(link)
        // 
        // Añadir li a ul
        songs.appendChild(li)
        // 
    })

}
loadSong = (songIndex) => {
    if (songIndex !== actualSong) {
        classActive(actualSong, songIndex);

        actualSong = songIndex;

        audio.src = `audio/` + songList[songIndex].file;
        audio.play();
        playSong();
        cambiarCover(songIndex);

        cambiarTitle(songIndex);

    }

}

// Actualizar barra de progreso
function updateProgress(event){
    // Total y el actual
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + `%`;
    seconds=`${currentTime}/${duration}`
    redondeo=parseInt(seconds);
    min=0

    if(redondeo >= 60){
        min++;
        redondeo-=60;
        if(redondeo >= 60){
            min++;
            redondeo-=60;
            if(redondeo >= 60){
                min++;
                redondeo-=60;
                if(redondeo >= 60){
                    min++;
                    redondeo-=60;
                    if(redondeo >= 60){
                        min++;
                        redondeo-=60;
                    }
                }
            }
        }
       
    }
    if(redondeo < 10){
        redondeo = "0"+redondeo
    }
    time.innerHTML = `${min}:${redondeo}`;
    // Duración
    duracionEnSegundos = audio.duration;
    duracionEnMinutos = Math.floor(duracionEnSegundos / 60);
  duracionSegundosRestantes = Math.floor(duracionEnSegundos %60);
  if(duracionSegundosRestantes < 10){
    duracionSegundosRestantes="0"+duracionSegundosRestantes
  }
    duracion.innerHTML=(duracionEnMinutos+":"+duracionSegundosRestantes)
  // duracion.innerHTML=red.toFixed(2);
    
}

// Hacer la barra de progreso que cambia
function setProgress(event){
   const totalWidth = this.offsetWidth;
   const progressWidth = event.offsetX;
   const current = (progressWidth/totalWidth) * audio.duration
   audio.currentTime = current
}
// Actualizar controles
updateControls = () => {
    if (audio.paused) {
        play.classList.remove("fa-pause");
        play.classList.add("fa-play")
    }
    else {
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}
// Reproducir canción
function playSong() {

    audio.play()
    updateControls();
}
// Pausar canción
function pauseSong() {
    
    audio.pause()
    updateControls();
}
// Cambiar clase activa
classActive = (lasIndex, newIndex) => {

    const links = document.querySelectorAll("a");

    if (lasIndex !== null) {
        links[lasIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}
// Cambiar el cover de la music
cambiarCover = (songIndex) => cover.src = `img/` + songList[songIndex].cover;
// Cambiar title
cambiarTitle = (songIndex) => title.innerText = songList[songIndex].title;

// Anterior canción
function prevSong() {
    
    if(actualSong > 0){
        loadSong(actualSong-1)
    }else{
        loadSong(songList.length -1)
    }
}
//  Siguiente canción
function nextSong() {
    if(actualSong < songList.length-1){
        loadSong(actualSong+1)
    }else{
        loadSong(0)
    }
    
}
// Cuando se acabe el audio que pase a la siguiente canción
audio.addEventListener("ended",()=>nextSong())
// GO
loadSongs()

