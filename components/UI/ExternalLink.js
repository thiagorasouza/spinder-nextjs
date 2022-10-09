import { BsBoxArrowUpRight } from "react-icons/bs";

import styles from "./ExternalLink.module.css";

function ExternalLink(props) {
  return (
    <span className="ms-1">
      <a
        href={props.url}
        target="_blank"
        className={styles.external}
        rel="noreferrer"
      >
        <BsBoxArrowUpRight />
      </a>
    </span>
  );
}

export default ExternalLink;
