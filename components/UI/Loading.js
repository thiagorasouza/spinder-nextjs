import { Spinner } from "react-bootstrap";
import Layout from "../Layout/Layout";

function LoadingPage() {
  return (
    <Layout verticallyCenter>
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Layout>
  );
}

export default LoadingPage;
