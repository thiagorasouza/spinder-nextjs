import { Offcanvas as BsOffcanvas } from "react-bootstrap";

import styles from "./Offcanvas.module.scss";

function Offcanvas(props) {
  const { className: iconClasses, ...iconProps } = props.titleIcon.props;

  return (
    <BsOffcanvas
      show={props.show}
      onHide={props.onHide}
      placement={props.placement}
      id={props.id}
      aria-labelledby={`${props.id}-label`}
      className={styles.offcanvas}
    >
      <BsOffcanvas.Header closeButton>
        <BsOffcanvas.Title id={`${props.id}-label`}>
          <props.titleIcon.type
            className={(iconClasses || "") + " d-inline-block align-top me-2"}
            {...iconProps}
          />
          <span className={styles.title}>{props.titleText}</span>
        </BsOffcanvas.Title>
      </BsOffcanvas.Header>
      <BsOffcanvas.Body className={styles.body}>
        {props.children}
      </BsOffcanvas.Body>
    </BsOffcanvas>
  );
}

export default Offcanvas;
