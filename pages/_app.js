import React from "react";
import Head from "next/head";
import { AlertContextProvider } from "../context/alert";
import { AudioContextProvider } from "../context/audio";
import { GenreContextProvider } from "../context/genre";
import ConnectionLostPage from "../components/UI/ConnectionLost";
import useOnline from "../hooks/useOnline";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/global.scss";
import { CookiesProvider } from "react-cookie";
import { SessionContextProvider } from "../context/session";
import useSessionContext from "../hooks/useSessionContext";
import { useRouter } from "next/router";
import LoadingPage from "../components/UI/Loading";

export default function App({ Component }) {
  const online = useOnline();

  return (
    <>
      <Head>
        <title>Spinder - Spotify meets Tinder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CookiesProvider>
        <AlertContextProvider>
          <AudioContextProvider>
            <GenreContextProvider>
              {online ? (
                <SessionContextProvider>
                  {Component.requiresAuthentication ? (
                    <Authenticated placeholder={Component.placeholder}>
                      <Component />
                    </Authenticated>
                  ) : (
                    <Component />
                  )}
                </SessionContextProvider>
              ) : (
                <ConnectionLostPage />
              )}
            </GenreContextProvider>
          </AudioContextProvider>
        </AlertContextProvider>
      </CookiesProvider>
    </>
  );
}

function Authenticated({ placeholder, children }) {
  const router = useRouter();
  const [user, loading] = useSessionContext();

  if (loading) {
    return placeholder || <LoadingPage />;
  } else if (user) {
    return children;
  } else {
    router.push("/login");
  }
}
