import { checkUserToken } from "../../../controllers/users.controller";
import { connect } from "../../../mongo/connect";

export default async function handler(req, res) {
  await connect();

  if (req.method === "POST") {
    await checkUserToken(req, res);
  }
}
