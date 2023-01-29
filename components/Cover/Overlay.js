import classNames from "classnames";

function Overlay({ children: Icon, show, position, onClick }) {
  const overlayClasses = classNames(
    "position-absolute d-flex justify-content-center align-items-center w-30 h-25 bg-white bg-opacity-50 bottom-0",
    {
      "start-0": position === "bottom-left",
      "end-0": position === "bottom-right",
    }
  );

  if (!show) {
    return null;
  }

  return (
    <div className={overlayClasses} role="button" onClick={onClick}>
      <Icon.type {...Icon.props} className="text-primary w-40 h-40" />
    </div>
  );
}

export default Overlay;
