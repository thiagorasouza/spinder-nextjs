import { Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import IconButton from "../UI/IconButton";

function CoverSaveButton(props) {
  return (
    <IconButton onClick={props.onClick} className="btn-like" size="lg">
      <FaHeart />
    </IconButton>
  );
}

export default CoverSaveButton;
