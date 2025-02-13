console.log("let's write js")
let currentSong = new Audio();


async function getSongs() {
    // List of songs hosted on GitHub
    let songs = [
        'Dream Big.mp3',
        'i dont think so.mp3',
        'patakha guddi.mp3'
    ];
    return songs;
}
const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track
    if (!pause) {
        currentSong.play();
        play.src = "paused.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}

async function main() {
    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Pad the minutes and seconds with leading zeros if necessary
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds.toFixed(0) : remainingSeconds.toFixed(0);

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    
    //for songs lists
    let songs = await getSongs()
    playMusic(songs[0], true)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
     <img class="invert" src="music.svg" alt="music icon">
                        <div class="info">
                            <div> ${song.replaceAll("%20", " ")}</div>
                        </div>
                        <div class="playnow">
                            <img class="invert" src="play.svg" alt=""></div></li>`

    }

    //Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    //Attach an event listener on play, next and previous
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "paused.svg"
        } else {
            currentSong.pause()
            play.src = "play.svg"
        }

    })

    //Listner for timeupdate
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}
    /${convertSecondsToMinutes(currentSong.duration)}`
    document.querySelector(".circlebar").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"
    })

    //Add event listner to seek bar 
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circlebar").style.left = percent + "%";
        currentSong.currentTime =((currentSong.duration *percent)/100) 
    })

    //Add event listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    //Add event listner to hamburger
    document.querySelector(".close-svg").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-100%"
    })
}
main()
