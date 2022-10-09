import { BsXLg } from "react-icons/bs";
import RoundedIconButton from "../UI/RoundedIconButton";

function CoverNextButton(props) {
  return (
    <RoundedIconButton onClick={props.onClick} size="lg">
      <BsXLg />
    </RoundedIconButton>
  );
}

export default CoverNextButton;
