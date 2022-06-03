import React from "react";
import Head from "next/head";

import { AlertContextProvider } from "../context/alert";
import { AudioContextProvider } from "../context/audio";
import { GenreContextProvider } from "../context/genre";
import { SessionProvider, useSession, signIn } from "next-auth/react";

import LoadingPage from "../components/UI/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/global.scss";

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

  // return placeholder;
  if (session.status === "loading") {
    return placeholder || <LoadingPage />;
  } else if (session.status === "authenticated") {
    return children;
  }
}
// style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;"
// box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;
