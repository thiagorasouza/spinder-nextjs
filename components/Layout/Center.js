function Center(props) {
  return (
    <div
      style={{ minHeight: "100vh", marginTop: "-9vh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {props.children}
    </div>
  );
}

export default Center;
