import { connect } from "../../../../../mongo/connect";
import {
  getAlbumFromUser,
  deleteAlbumFromUser,
} from "../../../../../controllers/users.controller";

export default async function handle(req, res) {
  await connect();

  if (req.method === "GET") {
    await getAlbumFromUser(req, res);
  } else if (req.method === "DELETE") {
    await deleteAlbumFromUser(req, res);
  }
}
