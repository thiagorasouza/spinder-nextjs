import Link from "next/link";
import fetcher from "../../lib/fetcher";

import { useRouter } from "next/router";
import { useState } from "react";
import useSessionContext from "../../hooks/useSessionContext";

import Card from "../../components/Layout/Card";
import { Alert, FloatingLabel, Form, Image } from "react-bootstrap";
import SubmitButton from "../../components/UI/SubmitButton";

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
    // await new Promise((resolve) => setTimeout(resolve, 2000));
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
    <Card className="pt-6 pb-4">
      <div className="text-center mb-5">
        <Image
          width="64"
          height="64"
          src="/img/logo-purple.png"
          alt="Spinder logo, a pile of three albums"
        />
        <h1 className="fs-2 fw-bold">Spinder</h1>
      </div>
      <div className="mb-3 text-center">{errorMessage}</div>
      <div className="mb-4">
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
          <SubmitButton submitting={fetching}>Login</SubmitButton>
        </Form>
      </div>
      <div className="mb-3 text-center">
        Or <Link href="/register">click here to register</Link>
      </div>
      <div className="fs-7 text-center">Spotify meets Tinder</div>
    </Card>
  );
}

export default LoginPage;
