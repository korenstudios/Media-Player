import MediaPlayer from "./mediaPlayerFactory.js";

const myPlayList = new MediaPlayer([
  {
    track: "./audio/I_Dont_Care.mp3",
    songName: "I Don't Care",
    artistName: "Ed Sheeran",
    coverArt: "./img/I_Dont_Care.jpg",
  },
  {
    track: "./audio/Cold_Water.mp3",
    songName: "Cold Water",
    artistName: "Major Lazer",
    coverArt: "./img/Cold_Water.jpg",
  },
  {
    track: "./audio/Despacito.mp3",
    songName: "Despacito",
    artistName: "Luis Fonsi",
    coverArt: "./img/Despacito.jpg",
  },
  {
    track: "./audio/Locked_Away.mp3",
    songName: "Locked Away",
    artistName: "R. City",
    coverArt: "./img/Locked_Away.jpg",
  },
  {
    track: "./audio/Smells_Like_Teen_Spirit.mp3",
    songName: "Smells Like Teen Spirit",
    artistName: "Malia J",
    coverArt: "./img/Smells_Like_Teen_Spirit.jpg",
  },
  {
    track: "./audio/Something_Just_Like_This.mp3",
    songName: "Something Just Like This",
    artistName: "Romy Wave",
    coverArt: "./img/Something_Just_Like_This.jpg",
  },
]);

export default myPlayList;
