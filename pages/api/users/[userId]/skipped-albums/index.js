import { connect } from "../../../../../mongo/connect";
import {
  saveSkippedAlbumToUser,
  getSkippedAlbumsFromUser,
  clearSkippedAlbums,
} from "../../../../../controllers/users.controller";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    await saveSkippedAlbumToUser(req, res);
  } else if (req.method === "GET") {
    await getSkippedAlbumsFromUser(req, res);
  } else if (req.method === "DELETE") {
    await clearSkippedAlbums(req, res);
  }
}
