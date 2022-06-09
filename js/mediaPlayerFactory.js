export const playPause = document.querySelector(".playPause");
export const shuffle = document.querySelector(".shuffle");
export const infinite = document.querySelector(".infinite");
export const volume = document.querySelector(".volume");
export const volumePower = document.querySelector(".volume-power");
export const audio = new Audio();
const title = document.querySelector(".title");
const coverArt = document.querySelector(".song-img");
const musicDuration = document.querySelector(".duration");
const musicCurrentTime = document.querySelector(".current-time");

export default class MediaPlayer {
  songsList;
  #originalSongsList;

  onAir = false;

  currentTrack = 0;

  constructor(songsList) {
    this.songsList = songsList;
    this.#originalSongsList = [...songsList];
  }

  playMusic() {
    this.onAir = true;
    audio.play();
    playPause.classList.add("active");
    playPause.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
    coverArt.style.animation = "rotateImg 10s linear infinite";
    title.style.animation = "titleMove 10s linear infinite";
  }

  pauseMusic() {
    this.onAir = false;
    audio.pause();
    playPause.classList.remove("active");
    playPause.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
    coverArt.style.animationPlayState = "paused";
    title.style.animationPlayState = "paused";
  }

  stopMusic() {
    audio.src = audio.src;
    playPause.classList.remove("active");
    playPause.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
    coverArt.style.animation = "normal";
    title.style.animation = "normal";
  }

  shuffleMusic() {
    const shuffleActive = shuffle.classList.toggle("active");

    if (shuffleActive) {
      for (let i = this.songsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.songsList[i], this.songsList[j]] = [
          this.songsList[j],
          this.songsList[i],
        ];
      }
    } else {
      this.songsList = [...this.#originalSongsList];
    }
  }

  loopMusic() {
    const infiniteActive = infinite.classList.toggle("active");
    if (infiniteActive) {
      audio.loop = true;
    } else {
      audio.loop = false;
    }
  }

  muteMusic() {
    const muteActive = volume.classList.toggle("active");
    if (muteActive) {
      volume.innerHTML = `<ion-icon name="volume-mute-outline"></ion-icon>`;
      audio.muted = true;
    } else {
      this.musicVolume();
    }
  }

  musicVolume() {
    if (volumePower.value > 80) {
      volume.innerHTML = `<ion-icon name="volume-high-outline"></ion-icon>`;
    }

    if (volumePower.value < 60) {
      volume.innerHTML = `<ion-icon name="volume-medium-outline"></ion-icon>`;
    }

    if (volumePower.value < 30) {
      volume.innerHTML = `<ion-icon name="volume-low-outline"></ion-icon>`;
    }

    if (volumePower.value < 1) {
      volume.innerHTML = `<ion-icon name="volume-off-outline"></ion-icon>`;
    }

    volume.classList.remove("active");
    audio.muted = false;

    audio.volume = volumePower.value / 100;
    volumePower.setAttribute("title", volumePower.value);
  }

  loadSong(songsList = this.songsList[this.currentTrack]) {
    title.textContent = `${songsList.artistName} - ${songsList.songName}`;
    audio.src = songsList.track;
    coverArt.src = songsList.coverArt;
    coverArt.setAttribute("alt", songsList.songName);
  }

  prevSong() {
    this.currentTrack--;
    if (this.currentTrack < 0) {
      this.currentTrack = this.songsList.length - 1;
    }

    this.loadSong();
  }

  nextSong() {
    this.currentTrack++;
    if (this.currentTrack > this.songsList.length - 1) {
      this.currentTrack = 0;
    }

    this.loadSong();
  }

  skipInSong(e) {
    let skipCount = 5;

    if (e.key === "ArrowRight") {
      audio.currentTime += skipCount;
    }

    if (e.key === "ArrowLeft") {
      audio.currentTime -= skipCount;
    }
  }

  formatSecondsAsTime(secs) {
    let hr = Math.floor(secs / 3600);
    let min = Math.floor((secs - hr * 3600) / 60);
    let sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }

    if (sec < 10) {
      sec = "0" + sec;
    }

    return min + ":" + sec;
  }

  updateTrackTime(track) {
    let currentTime = Math.floor(track.currentTime).toString();
    let duration = Math.floor(track.duration).toString();
    audio.preload = "metadata";

    musicCurrentTime.textContent = this.formatSecondsAsTime(currentTime);

    if (isNaN(duration)) {
      musicDuration.textContent = "00:00";
    } else {
      musicDuration.textContent = this.formatSecondsAsTime(duration);
    }
  }
}
