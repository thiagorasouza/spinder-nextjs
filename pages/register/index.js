import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FloatingLabel, Form, Image } from "react-bootstrap";
import Card from "../../components/Layout/Card";
import SubmitButton from "../../components/UI/SubmitButton";
import fetcher from "../../lib/fetcher";

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

    router.push("/login");
  }

  return (
    <Card className="pt-4">
      <div className="d-flex align-items-center justify-content-center mb-4 mt-2">
        <Image
          width="48"
          height="48"
          src="/img/logo-purple.png"
          className="me-2"
          alt="Spinder logo, a pile of three albums"
        />
        <span className="fs-2 fw-bold">Spinder</span>
      </div>
      <div className="mb-3 text-center">{errorMessage}</div>
      <div className="mb-4">
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
          <SubmitButton submitting={fetching}>Register</SubmitButton>
        </Form>
        <div className="mb-3 text-center">
          Or <Link href="/login">click here to login</Link>
        </div>
      </div>
      <div className="fs-7 text-center">Spotify meets Tinder.</div>
    </Card>
  );
}

export default RegisterPage;
