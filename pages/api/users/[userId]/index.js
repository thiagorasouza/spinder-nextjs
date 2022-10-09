import { connect } from "../../../../mongo/connect";
import { getUser, deleteUser } from "../../../../controllers/users.controller";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    await getUser(req, res);
  } else if (req.method === "DELETE") {
    await deleteUser(req, res);
  }
}
