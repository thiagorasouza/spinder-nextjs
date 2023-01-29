import { Button, Spinner } from "react-bootstrap";

function SubmitButton({ submitting, children }) {
  return (
    <Button
      type="submit"
      disabled={submitting}
      className="d-flex align-items-center justify-content-center m-auto w-100"
    >
      {submitting ? (
        <>
          <Spinner
            animation="border"
            role="status"
            size="sm"
            className="me-2"
          />
          {"Processing..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default SubmitButton;
