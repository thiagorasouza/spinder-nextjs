import { BsBoxArrowUpRight } from "react-icons/bs";

import styles from "./ExternalLink.module.css";

function ExternalLink(props) {
  return (
    <div className="ms-1">
      <a
        href={props.url}
        target="_blank"
        className={styles.external}
        rel="noreferrer"
      >
        <BsBoxArrowUpRight />
      </a>
    </div>
  );
}

export default ExternalLink;
