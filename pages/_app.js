import React, { useState } from "react";
import Head from "next/head";

import { AlertContextProvider } from "../context/alert";
import { AudioContextProvider } from "../context/audio";
import { GenreContextProvider } from "../context/genre";
import { SessionProvider, useSession, signOut } from "next-auth/react";

import LoadingPage from "../components/UI/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/global.scss";
import ConnectionLostPage from "../components/UI/ConnectionLost";
import useMountEffect from "../hooks/useMountEffect";
import useOnline from "../hooks/useOnline";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const online = useOnline();

  return (
    <>
      <Head>
        <title>Spinder - Spotify meets Tinder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AlertContextProvider>
        <AudioContextProvider>
          <GenreContextProvider>
            {online ? (
              <SessionProvider session={session}>
                {Component.requiresAuthentication ? (
                  <Authenticated placeholder={Component.placeholder}>
                    <Component {...pageProps} />
                  </Authenticated>
                ) : (
                  <Component {...pageProps} />
                )}
              </SessionProvider>
            ) : (
              <ConnectionLostPage />
            )}
          </GenreContextProvider>
        </AudioContextProvider>
      </AlertContextProvider>
    </>
  );
}

function Authenticated({ placeholder, children }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      if (window.navigator.onLine) {
        signOut({ callbackUrl: "/login" });
      }
    },
  });

  // return placeholder;
  if (session.status === "loading") {
    return placeholder || <LoadingPage />;
  } else if (session.status === "authenticated") {
    return children;
  }
}
