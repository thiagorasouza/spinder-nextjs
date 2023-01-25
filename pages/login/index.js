import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import { autoLogin } from "../../lib/http";

import styles from "./index.module.css";

function LoginPage() {
  function handleLogin() {}

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
      <div className={styles.form}>
        <Form>
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
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button>Login</Button>
        </Form>
      </div>
      <div className={styles.footer}>
        <p>Spotify meets Tinder.</p>
      </div>
    </Card>
  );
}

export default LoginPage;
