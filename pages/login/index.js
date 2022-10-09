import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "react-bootstrap";

import styles from "./index.module.css";

function LoginPage() {
  function signInAndRedirect() {
    signIn("spotify", { callbackUrl: "/" });
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
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
        <div className={styles.controls}>
          <Button onClick={signInAndRedirect}>Login with Spotify</Button>
        </div>
        <div className={styles.footer}>
          <p>Spotify meets Tinder.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
