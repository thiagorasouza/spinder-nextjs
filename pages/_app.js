import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/global.scss";

import React from "react";
import Head from "next/head";
import { AlertContextProvider } from "../context/alert";
import { AudioContextProvider } from "../context/audio";
import { GenreContextProvider } from "../context/genre";
import ConnectionLostPage from "../components/UI/ConnectionLost";
import useOnline from "../hooks/useOnline";

import { SessionContextProvider } from "../context/session";
import useSessionContext from "../hooks/useSessionContext";
import { useRouter } from "next/router";
import LoadingPage from "../components/UI/Loading";

export default function App({ Component }) {
  const online = useOnline();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Spinder - Spotify meets Tinder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SessionContextProvider>
        <AlertContextProvider>
          <AudioContextProvider>
            <GenreContextProvider>
              {online ? (
                Component.requiresAuthentication ? (
                  <Authenticated placeholder={Component.placeholder}>
                    <Component />
                  </Authenticated>
                ) : (
                  <Component />
                )
              ) : (
                <ConnectionLostPage />
              )}
            </GenreContextProvider>
          </AudioContextProvider>
        </AlertContextProvider>
      </SessionContextProvider>
    </>
  );
}

function Authenticated({ placeholder, children }) {
  const router = useRouter();
  const { status } = useSessionContext();

  if (status === "initial" || status === "loading") {
    return placeholder || <LoadingPage />;
  } else if (status === "authenticated") {
    return children;
  } else {
    router.push("/login");
  }
}
