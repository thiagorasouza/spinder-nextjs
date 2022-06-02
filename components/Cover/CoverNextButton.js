import { Button } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import IconButton from "../UI/IconButton";

function CoverNextButton(props) {
  return (
    <IconButton onClick={props.onClick} className="btn-like" size="lg">
      <BsXLg />
    </IconButton>
  );
}

export default CoverNextButton;
