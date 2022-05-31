import "../../../../../mongo/connect";
import {
  saveAlbumToUser,
  getAlbumsFromUser,
} from "../../../../../controllers/users.controller";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await saveAlbumToUser(req, res);
  } else if (req.method === "GET") {
    await getAlbumsFromUser(req, res);
  }
}
