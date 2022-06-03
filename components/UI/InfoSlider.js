import LoadingSpinner from "./LoadingSpinner";
import Offcanvas from "./Offcanvas";
import { MdInfo } from "react-icons/md";

function InfoSlider(props) {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="bottom"
      id="info-slider"
      titleIcon={<MdInfo className="mt-1" />}
      titleText="Information"
    >
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
    </Offcanvas>
  );
}

export default InfoSlider;
