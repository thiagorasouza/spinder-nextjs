import { MdInfo } from "react-icons/md";
import IconButton from "./IconButton";

function InfoButton(props) {
  return (
    <IconButton onClick={props.onClick}>
      <MdInfo />
    </IconButton>
  );
}

export default InfoButton;
