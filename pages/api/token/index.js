import { connect } from "../../../mongo/connect";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    const response = await fetch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );
    const tokenPayload = await response.json();

    return res.status(200).json(tokenPayload);
  }
}
