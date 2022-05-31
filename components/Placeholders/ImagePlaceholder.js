import { Image } from "react-bootstrap";

function ImagePlaceholder(props) {
  return (
    <Image
      width="640"
      height="640"
      className="cover-image"
      data-src="holder.js/640x640?auto=yes&text=..."
      alt=""
    />
  );
}

export default ImagePlaceholder;
