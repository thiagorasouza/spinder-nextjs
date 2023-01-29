import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import useSessionContext from "../../hooks/useSessionContext";
import fetcher from "../../lib/fetcher";

import styles from "./index.module.css";

function LoginPage() {
  const { status, login } = useSessionContext();
  const [fetching, setFetching] = useState(false);
  console.log("🚀 ~ fetching", fetching);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    setFetching(true);
    const response = await fetcher("/api/login", {
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
      <p>{errorMessage ?? null}</p>
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
              placeholder="Password"
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
                {"Logging in..."}
              </>
            ) : (
              "Login"
            )}
          </Button>
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
