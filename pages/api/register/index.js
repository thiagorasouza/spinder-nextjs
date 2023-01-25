import { connect } from "../../../mongo/connect";
import { createUser } from "../../../controllers/users.controller";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    await createUser(req, res);
  }
}
