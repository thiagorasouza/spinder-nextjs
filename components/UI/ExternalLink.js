import { BsBoxArrowUpRight } from "react-icons/bs";

function ExternalLink(props) {
  return (
    <span className="ms-1">
      <a href={props.url} target="_blank" rel="noreferrer">
        <BsBoxArrowUpRight
          className="align-baseline"
          style={{ width: "1rem", height: "1rem" }}
        />
      </a>
    </span>
  );
}

export default ExternalLink;
