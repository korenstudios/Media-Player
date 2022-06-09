import {
  playPause,
  shuffle,
  infinite,
  volume,
  volumePower,
  audio,
} from "./mediaPlayerFactory.js";

import myPlayList from "./playlist.js";
const prev = document.querySelector(".prev");
const stopAudio = document.querySelector(".stop");
const next = document.querySelector(".next");

myPlayList.loadSong();

playPause.addEventListener("click", () => {
  myPlayList.onAir ? myPlayList.pauseMusic() : myPlayList.playMusic();
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    myPlayList.onAir ? myPlayList.pauseMusic() : myPlayList.playMusic();
  }
});

stopAudio.addEventListener("click", () => {
  myPlayList.pauseMusic();
  myPlayList.stopMusic();
});

prev.addEventListener("click", () => {
  myPlayList.prevSong();
  myPlayList.onAir ? myPlayList.playMusic() : myPlayList.pauseMusic();
});

next.addEventListener("click", () => {
  myPlayList.nextSong();
  myPlayList.onAir ? myPlayList.playMusic() : myPlayList.pauseMusic();
});

audio.addEventListener("loadedmetadata", function () {
  myPlayList.updateTrackTime(this);
});

audio.addEventListener("timeupdate", function () {
  myPlayList.updateTrackTime(this);
});

audio.addEventListener("ended", () => {
  myPlayList.nextSong();
  myPlayList.playMusic();
});

shuffle.addEventListener("click", () => {
  myPlayList.shuffleMusic();
});

infinite.addEventListener("click", () => myPlayList.loopMusic());

volume.addEventListener("click", () => myPlayList.muteMusic());

volumePower.addEventListener("input", () => myPlayList.musicVolume());

window.addEventListener("keydown", (e) => myPlayList.skipInSong(e));
