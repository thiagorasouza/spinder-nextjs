import { Image } from "react-bootstrap";

function CoverImage(props) {
  return (
    <Image
      key={props.src}
      width="480"
      height="480"
      thumbnail
      rounded
      src={props.src}
      alt={props.alt}
      className="mw-100 p-1 shadow-sm bg-white"
      style={{ aspectRatio: "1/1" }}
    />
  );
}

export default CoverImage;
