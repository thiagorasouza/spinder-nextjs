import { MdDelete } from "react-icons/md";

import IconButton from "./IconButton";

function DeleteButton(props) {
  return (
    <IconButton variant="danger" onClick={props.onClick}>
      <MdDelete />
    </IconButton>
  );
}

export default DeleteButton;
