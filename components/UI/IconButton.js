import { Button } from "react-bootstrap";

import styles from "./IconButton.module.css";

function IconButton({ children, ...props }) {
  const classes = props.className || "";
  delete props.className;

  return (
    <Button className={styles.btnIcon + " " + classes} {...props}>
      {children}
    </Button>
  );
}

export default IconButton;
