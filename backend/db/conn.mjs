import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

const dbName = process.env.DB_NAME;


let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db(dbName);

export default db;
