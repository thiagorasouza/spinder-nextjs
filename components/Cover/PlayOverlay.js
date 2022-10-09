import Overlay from "./Overlay";
import { MdPause, MdPlayArrow, MdPlayDisabled, MdInfo } from "react-icons/md";

function PlayOverlay(props) {
  return (
    <Overlay
      show={props.show}
      position="bottom-right"
      onClick={props.playing ? props.onPause : props.onPlay}
    >
      {props.playable ? (
        props.playing ? (
          <MdPause />
        ) : (
          <MdPlayArrow />
        )
      ) : (
        <MdPlayDisabled />
      )}
    </Overlay>
  );
}

export default PlayOverlay;
