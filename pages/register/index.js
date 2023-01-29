import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import fetcher from "../../lib/fetcher";
import styles from "./index.module.css";

function RegisterPage() {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    setFetching(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetcher("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFetching(false);

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
            <Form.Control
              name="name"
              type="name"
              placeholder="your name"
              disabled={fetching}
            />
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
              disabled={fetching}
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
              disabled={fetching}
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
              disabled={fetching}
            />
          </FloatingLabel>
          <Button
            type="submit"
            disabled={fetching}
            className="d-flex align-items-center justify-content-center m-auto w-100"
          >
            {fetching ? (
              <>
                <span aria-label="spinner" className={styles.spinner}></span>
                {"Processing..."}
              </>
            ) : (
              "Register"
            )}
          </Button>
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
