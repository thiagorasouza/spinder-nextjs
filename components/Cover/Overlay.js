function Overlay({ children: Icon, show, position, onClick }) {
  const positionClasses = {
    "top-right": "overlay-top-right",
    "bottom-right": "overlay-bottom-right",
    center: "overlay-bottom-center",
    "bottom-left": "overlay-bottom-left",
  };

  return (
    <div
      className={
        "position-absolute d-flex justify-content-center align-items-center " +
        (show ? "visible " : "invisible ") +
        positionClasses[position]
      }
      style={{
        width: "30%",
        height: "25%",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
      role="button"
      onClick={onClick}
    >
      <Icon.type
        {...Icon.props}
        style={{ width: "40%", height: "40%", color: "#0d6efd" }}
      />
    </div>
  );
}

export default Overlay;
