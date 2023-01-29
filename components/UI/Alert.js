import { Alert as BsAlert } from "react-bootstrap";

function Alert(props) {
  if (!props.alert) {
    return null;
  }

  return (
    <BsAlert
      show={props.show}
      className="d-block bottom-0 position-fixed"
      style={{ zIndex: "1030", left: "0.75rem", right: "0.75rem" }}
      variant={props.alert.type}
      dismissible
      onClose={props.onClose}
    >
      {props.alert.message}
    </BsAlert>
  );
}

export default Alert;
