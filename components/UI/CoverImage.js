import { Image } from "react-bootstrap";

import styles from "./CoverImage.module.css";

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
      className={styles.image}
    />
  );
}

export default CoverImage;
