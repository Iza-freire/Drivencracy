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

        app.post('/poll', async (req, res) => {
            const { title, expireAt = '' } = req.body;
            if (!title) {
                return res.status(422).send({ error: 'Title is required' });
            }

            const now = new Date();
            const defaultExpireAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            const parsedExpireAt = expireAt ? new Date(expireAt) : defaultExpireAt;

            const poll = {
                title,
                expireAt: parsedExpireAt.toISOString().slice(0, 16),
            };

            const { insertedId } = await pollsCollection.insertOne(poll);
            return res.status(201).send({
                _id: insertedId,
                title,
                expireAt: parsedExpireAt.toISOString().slice(0, 16),
            });
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();


