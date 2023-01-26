import React from "react";
import Head from "next/head";
import { AlertContextProvider } from "../context/alert";
import { AudioContextProvider } from "../context/audio";
import { GenreContextProvider } from "../context/genre";
import ConnectionLostPage from "../components/UI/ConnectionLost";
import useOnline from "../hooks/useOnline";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/scss/global.scss";

export default function App({ Component }) {
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
              // <SessionProvider session={session}>
              //   {Component.requiresAuthentication ? (
              //     <Authenticated placeholder={Component.placeholder}>
              <Component />
            ) : (
              //     </Authenticated>
              //   ) : (
              //     <Component {...pageProps} />
              //   )}
              // </SessionProvider>
              <ConnectionLostPage />
            )}
          </GenreContextProvider>
        </AudioContextProvider>
      </AlertContextProvider>
    </>
  );
}

// function Authenticated({ placeholder, children }) {
//   const session = useSession({
//     required: true,
//     onUnauthenticated() {
//       if (window.navigator.onLine) {
//         signOut({ callbackUrl: "/login" });
//       }
//     },
//   });

//   // return placeholder;
//   if (session.status === "loading") {
//     return placeholder || <LoadingPage />;
//   } else if (session.status === "authenticated") {
//     return children;
//   }
// }
