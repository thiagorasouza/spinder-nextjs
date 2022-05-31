import "../../../../../mongo/connect";
import {
  getAlbumFromUser,
  deleteAlbumFromUser,
} from "../../../../../controllers/users.controller";

export default async function handle(req, res) {
  if (req.method === "GET") {
    await getAlbumFromUser(req, res);
  } else if (req.method === "DELETE") {
    await deleteAlbumFromUser(req, res);
  }
}
