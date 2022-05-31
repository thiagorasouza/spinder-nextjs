import { BsBoxArrowUpRight } from "react-icons/bs";

function ExternalLink(props) {
  return (
    <div className="ms-1">
      <a href={props.url} target="_blank" className="external">
        <BsBoxArrowUpRight />
      </a>
    </div>
  );
}

export default ExternalLink;
