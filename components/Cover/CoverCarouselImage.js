import { useState } from "react";

import useAudioContext from "../../hooks/useAudioContext";
import InfoOverlay from "./InfoOverlay";
import PlayOverlay from "./PlayOverlay";
import CoverImage from "../UI/CoverImage";

function CoverCarouselImage(props) {
  const [hovered, setHovered] = useState(true);

  const { audio, playAudio, pauseAudio } = useAudioContext();
  const audioURL = props.album.previewURL;
  const playable = audioURL !== null;
  const playing = audio && audio.src === audioURL;

  function handleInfo() {
    props.onInfo(props.album.artistName, props.album.albumName);
  }

  function handlePlay() {
    playAudio(audioURL);
  }

  function handlePause() {
    pauseAudio();
  }

  return (
    <>
      <div
        className="position-relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CoverImage src={props.album.coverURL} alt="Current cover image" />
        <PlayOverlay
          show={hovered}
          playable={playable}
          playing={playing}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <InfoOverlay show={hovered} onClick={handleInfo} />
      </div>
    </>
  );
}

export default CoverCarouselImage;
