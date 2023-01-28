import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import styles from "./index.module.css";

function RegisterPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 400) {
      const json = await response.json();
      const errorMessage = json.message;
      return setErrorMessage(errorMessage);
    }

    if (response.status !== 200) {
      return setErrorMessage("Unknown server error. Please try again later.");
    }

    const user = await response.json();
    router.push("/login");
  }

  return (
    <Card>
      <div className={styles.title}>
        <h1>Create your account</h1>
      </div>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className={styles.form}>
        <Form onSubmit={handleRegister} className="mb-3">
          <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
            <Form.Control name="name" type="name" placeholder="your name" />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              name="password"
              type="password"
              placeholder="password"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Password Confirmation"
            className="mb-3"
          >
            <Form.Control
              name="passwordConfirmation"
              type="password"
              placeholder="password confirmation"
            />
          </FloatingLabel>
          <Button type="submit">Register</Button>
        </Form>
        <p>
          Or <Link href="/login">click here to login</Link>
        </p>
      </div>
      <div className={styles.footer}>
        <p>Spinder - Spotify meets Tinder.</p>
      </div>
    </Card>
  );
}

export default RegisterPage;
