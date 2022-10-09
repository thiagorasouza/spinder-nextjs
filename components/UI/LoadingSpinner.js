import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <div className="text-center mb-3">
      <Spinner animation="border" role="status" />
    </div>
  );
}

export default LoadingSpinner;
