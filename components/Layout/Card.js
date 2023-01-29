import classNames from "classnames";

function Card(props) {
  return (
    <div className="m-auto position-absolute top-0 start-0 bottom-0 end-0 d-flex flex-column justify-content-center align-items-center py-2">
      <div
        className={classNames(
          "w-100 py-3 px-4 bg-white rounded-1 shadow-sm",
          props.className
        )}
        style={{ maxWidth: "20rem" }}
      >
        {props.children}
      </div>
    </div>
  );
}

export default Card;
