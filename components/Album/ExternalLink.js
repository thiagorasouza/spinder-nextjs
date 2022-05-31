import { BsBoxArrowUpRight } from "react-icons/bs";

function ExternalLink(props) {
  return (
    <div className="ms-1">
      <a href={props.url} target="_blank" className="external" rel="noreferrer">
        <BsBoxArrowUpRight />
      </a>
    </div>
  );
}

export default ExternalLink;
