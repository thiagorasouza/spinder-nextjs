import { Offcanvas } from "react-bootstrap";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./InfoSlider.module.css";

function InfoSlider(props) {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="bottom"
      id="info-slider"
      aria-labelledby="info-slider-label"
      className={styles.offcanvas}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="info-slider-label">Information</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {props.isLoading ? (
          <LoadingSpinner />
        ) : (
          props.info && (
            <>
              <p>{props.info.text}</p>
              <p className="text-end">
                <a href={props.info.more}>Read more on {props.info.api}</a>
              </p>
            </>
          )
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default InfoSlider;
