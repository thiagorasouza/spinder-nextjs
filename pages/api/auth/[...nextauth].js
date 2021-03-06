import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      profile(profile, token) {
        return {
          id: profile.id,
          spotifyId: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
          albums: [],
        };
      },
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: [
            "user-read-email",
            "user-read-private",
            "user-library-modify",
            "user-library-read",
          ],
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.spotifyId = account.providerAccountId;
        token.country = profile.country;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      session.user.spotifyId = token.spotifyId;
      session.user.country = token.country;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.JWT_SECRET,
});
