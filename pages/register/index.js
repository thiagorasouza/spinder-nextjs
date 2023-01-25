import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import styles from "./index.module.css";

function RegisterPage() {
  function handleRegister() {
    console.log("Register");
  }

  return (
    <Card>
      <div className={styles.title}>
        <h1>Create your account</h1>
      </div>
      <div className={styles.form}>
        <Form>
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control type="name" placeholder="your name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="password" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Password Confirmation"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="password confirmation" />
          </FloatingLabel>
          <Button>Register</Button>
        </Form>
      </div>
      <div className={styles.footer}>
        <p>Spinder - Spotify meets Tinder.</p>
      </div>
    </Card>
  );
}

export default RegisterPage;
