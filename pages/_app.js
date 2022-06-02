import React from "react";

import { SessionProvider, useSession, signIn } from "next-auth/react";
import { GenreContextProvider } from "../context/genre";

import LoadingPage from "../components/UI/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/css/global.css";
import "../styles/scss/global.scss";
import Head from "next/head";
import { AudioContextProvider } from "../context/audio";
import { AlertContextProvider } from "../context/alert";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Spinder - Spotify meets Tinder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AlertContextProvider>
        <AudioContextProvider>
          <GenreContextProvider>
            <SessionProvider session={session}>
              {Component.requiresAuthentication ? (
                <Authenticated placeholder={Component.placeholder}>
                  <Component {...pageProps} />
                </Authenticated>
              ) : (
                <Component {...pageProps} />
              )}
            </SessionProvider>
          </GenreContextProvider>
        </AudioContextProvider>
      </AlertContextProvider>
    </>
  );
}

function Authenticated({ placeholder, children }) {
  const session = useSession({ required: true });

  if (session.status === "loading") {
    return placeholder || <LoadingPage />;
  } else if (session.status === "authenticated") {
    return children;
  }
}
