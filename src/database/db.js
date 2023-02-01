import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url, { useUnifiedTopology: true });

try {
    await client.connect();
    console.log("Connected to MongoDB");
} catch (err) {
    console.log(err);
}

const db = client.db("drivencracy");
export const pollsCollection = db.collection("poll");
