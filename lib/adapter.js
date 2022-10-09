import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import client from "./mongodb";

const adapter = MongoDBAdapter(client);

export default adapter;
