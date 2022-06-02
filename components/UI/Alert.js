import { Alert as BootstrapAlert } from "react-bootstrap";

import styles from "./Alert.module.css";

function Alert(props) {
  if (!props.alert) {
    return null;
  }

  return (
    <BootstrapAlert
      show={props.show}
      className={styles.flashAlert}
      variant={props.alert.type}
      dismissible
      onClose={props.onClose}
    >
      {props.alert.message}
    </BootstrapAlert>
  );
}

export default Alert;
