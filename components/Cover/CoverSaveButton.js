import { FaHeart } from "react-icons/fa";
import RoundedIconButton from "../UI/RoundedIconButton";

function CoverSaveButton(props) {
  return (
    <RoundedIconButton onClick={props.onClick} size="lg">
      <FaHeart />
    </RoundedIconButton>
  );
}

export default CoverSaveButton;
