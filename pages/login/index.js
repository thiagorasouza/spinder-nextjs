import Link from "next/link";
import fetcher from "../../lib/fetcher";
import { VscDebugDisconnect } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSessionContext from "../../hooks/useSessionContext";

import Card from "../../components/Layout/Card";
import { Alert, Button, FloatingLabel, Form, Image } from "react-bootstrap";
import SubmitButton from "../../components/UI/SubmitButton";
import BasicPage from "../../components/UI/BasicPage";
import Layout from "../../components/Layout/Layout";

function LoginPage() {
  const { status, login } = useSessionContext();
  const [fetching, setFetching] = useState(false);
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
    return router.push("/");
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Layout verticallyCenter>
        <div className="d-flex justify-content-center">
          <div className="d-inline-block bg-white p-3 my-0 shadow-sm rounded">
            <div className="my-3 mb-4 text-center">
              <span className="fs-4 fw-bold">This app has stopped working</span>
            </div>
            <div>
              <p>
                This app relied heavily on Spotify's API recommendations
                endpoint, which{" "}
                <Link href="https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api">
                  is no longer available after November 27, 2024
                </Link>
                .
              </p>
              <p>
                For this reason, this app has stopped working and is no longer
                available for use.
              </p>
              <Link href="https://thiago-souza.com/" passHref>
                <Button
                  className="my-4 d-flex align-items-center gap-3 mx-auto"
                  style={{ maxWidth: "max-content" }}
                >
                  <FiExternalLink />
                  View other projects
                </Button>
              </Link>
              <div className="d-none my-4 d-xl-flex gap-3 justify-content-center">
                <img src="/img/spinder.png?raw=true" width={260} />
                <img src="/img/info.png?raw=true" width={260} />
                <img src="/img/library.png?raw=true" width={260} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      {/* <Card className="pt-6 pb-4">
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
                defaultValue="testaccount@email.com"
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
                defaultValue="testaccount##99885"
              />
            </FloatingLabel>
            <SubmitButton submitting={fetching}>Login</SubmitButton>
          </Form>
        </div>
        <div className="mb-3 text-center">
          Or <Link href="/register">click here to register</Link>
        </div>
        <div className="fs-7 text-center">Spotify meets Tinder</div>
      </Card> */}
    </>
  );
}

export default LoginPage;
