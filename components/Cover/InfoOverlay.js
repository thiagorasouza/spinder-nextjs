import Overlay from "./Overlay";
import { MdInfo } from "react-icons/md";

function InfoOverlay(props) {
  return (
    <Overlay show={props.show} position="bottom-left" onClick={props.onClick}>
      <MdInfo />
    </Overlay>
  );
}

export default InfoOverlay;
