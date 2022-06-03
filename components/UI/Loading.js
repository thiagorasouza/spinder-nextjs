import { Spinner } from "react-bootstrap";
import Layout from "../Layout/Layout";

function LoadingPage() {
  return (
    <Layout verticallyCenter>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Layout>
  );
}

export default LoadingPage;
