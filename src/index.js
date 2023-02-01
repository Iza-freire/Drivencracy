import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5008;

const url = process.env.MONGO_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db('polls');
        const pollsCollection = db.collection('polls');
        const choicesCollection = db.collection('choices');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();


