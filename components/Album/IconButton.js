import { Button } from "react-bootstrap";

function IconButton({ children, ...props }) {
  return (
    <Button className="btn-icon" {...props}>
      {children}
    </Button>
  );
}

export default IconButton;
