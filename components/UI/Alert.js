import { Alert as BsAlert } from "react-bootstrap";

import styles from "./Alert.module.css";

function Alert(props) {
  if (!props.alert) {
    return null;
  }

  return (
    <BsAlert
      show={props.show}
      className={styles.alert}
      variant={props.alert.type}
      dismissible
      onClose={props.onClose}
    >
      {props.alert.message}
    </BsAlert>
  );
}

export default Alert;
