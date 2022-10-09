import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;

if (isDevEnvironment()) {
  const cachedClient = getCachedClientForHotReloads();

  if (!cachedClient) {
    client = getClientPromise();
    cacheClientForHotReloads(client);
  } else {
    client = cachedClient;
  }
} else {
  client = getClientPromise();
}

function isDevEnvironment() {
  return process.env.NODE_ENV === "development";
}

function getCachedClientForHotReloads() {
  return global.mongoClient;
}

function cacheClientForHotReloads(client) {
  global.mongoClient = client;
}

function getClientPromise() {
  return new MongoClient(uri).connect();
}

export default client;
