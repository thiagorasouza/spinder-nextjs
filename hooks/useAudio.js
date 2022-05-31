import { useState } from "react";

function useAudio() {
  const [audio, setAudio] = useState(null);

  function playAudio(url) {
    if (audio?.src === url) {
      return;
    }

    if (audio) {
      pauseAudio();
    }

    const newAudio = new Audio(url);
    newAudio.play();
    newAudio.addEventListener("ended", finishedAudioHandler);
    setAudio(newAudio);
  }

  function pauseAudio() {
    audio.pause();
    audio.removeEventListener("ended", finishedAudioHandler);
    setAudio(null);
  }

  function finishedAudioHandler() {
    setAudio(null);
  }

  const playing = audio && !audio.paused;

  return {
    audio,
    playing,
    playAudio,
    pauseAudio,
  };
}

export default useAudio;
