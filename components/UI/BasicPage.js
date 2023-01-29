import Layout from "../Layout/Layout";

function BasicPage(props) {
  return (
    <Layout verticallyCenter>
      <div
        className="bg-white p-3 my-0 mx-auto shadow-sm"
        style={{ maxWidth: props.maxWidth }}
      >
        <div className="mb-3">
          <props.icon.type
            className="me-1 align-middle"
            style={{ width: "20px", height: "20px" }}
          />
          <span className="fw-bold">{props.title}</span>
        </div>
        <div>{props.children}</div>
      </div>
    </Layout>
  );
}

export default BasicPage;
