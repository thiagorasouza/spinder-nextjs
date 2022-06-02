import { Button } from "react-bootstrap";

function IconButton({ children, ...props }) {
  const classes = props.className || "";
  delete props.className;

  return (
    <Button className={`btn-icon ${classes}`} {...props}>
      {children}
    </Button>
  );
}

export default IconButton;
