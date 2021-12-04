const video = document.querySelector("video");

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

let volumeValue = 0.5;
video.volume = volumeValue;


const handlePlayClick = () => {
  // if the video is playing, pause it
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.play ? "Pause" : "Play";
};

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  if(video.muted === false) {
    video.muted = false;
    muteBtn.innerText= "Mute";
  }
  volumeValue = value;
  video.volume = value;
};
const formatTime = (seconds) => 
  new Date(seconds * 1000).toISOString().substr(11, 8);

  const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
  };
  
  const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
  };
  
  const handleTimelineChange = (event) => {
    const {
      target: { value },
    } = event;
    video.currentTime = value;
  };
  
  playBtn.addEventListener("click", handlePlayClick);
  muteBtn.addEventListener("click", handleMuteClick);
  volumeRange.addEventListener("input", handleVolumeChange);
  video.addEventListener("loadedmetadata", handleLoadedMetadata);
  video.addEventListener("timeupdate", handleTimeUpdate);
  timeline.addEventListener("input", handleTimelineChange);