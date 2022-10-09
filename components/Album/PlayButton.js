import { MdPlayArrow, MdPlayDisabled, MdPause } from "react-icons/md";
import IconButton from "../UI/IconButton";

function PlayButton(props) {
  const playButton = (
    <IconButton onClick={props.onPlay}>
      <MdPlayArrow />
    </IconButton>
  );

  const pauseButton = (
    <IconButton onClick={props.onPause}>
      <MdPause />
    </IconButton>
  );

  const unplayableButton = (
    <IconButton disabled>
      <MdPlayDisabled />
    </IconButton>
  );

  if (!props.playable) {
    return unplayableButton;
  }

  return props.playing ? pauseButton : playButton;
}

export default PlayButton;
