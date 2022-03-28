import type { Db, MongoClientOptions } from "mongodb";
import { MongoClient } from "mongodb";

const { MONGODB_URI } = process.env;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const connectToDatabase = async () => {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Set the connection options
  const opts: MongoClientOptions = {};

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  const db = client.db();

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
};

export default connectToDatabase;
