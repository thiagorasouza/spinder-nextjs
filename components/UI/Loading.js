import { Container, Spinner } from "react-bootstrap";
import Center from "../Layout/Center";
import Layout from "../Layout/Layout";

function LoadingPage() {
  return (
    <Layout>
      <Center>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Center>
    </Layout>
  );
}

export default LoadingPage;
