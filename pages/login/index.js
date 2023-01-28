import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import useSessionContext from "../../hooks/useSessionContext";

import styles from "./index.module.css";

function LoginPage() {
  const { status, login } = useSessionContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    const response = await fetch("/api/login", {
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

    const json = await response.json();

    await login(json.userToken);
    router.push("/");
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <Card>
      <div className={styles.logo}>
        <Image
          width="64"
          height="64"
          src="/img/logo-purple.png"
          alt="Spinder logo, a pile of three albums"
        />
      </div>
      <div className={styles.title}>
        <h1>Spinder</h1>
      </div>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className={styles.form}>
        <Form onSubmit={handleLogin} className="mb-3">
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              defaultValue="johndoe@email.com"
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
              placeholder="Password"
              defaultValue="abc123"
            />
          </FloatingLabel>
          <Button type="submit">Login</Button>
        </Form>
      </div>
      <p>
        Or <Link href="/register">click here to register</Link>
      </p>
      <div className={styles.footer}>
        <p>Spotify meets Tinder.</p>
      </div>
    </Card>
  );
}

export default LoginPage;
