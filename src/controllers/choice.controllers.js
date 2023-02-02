import { ObjectId } from "mongodb";
import { pollsCollection, choicesCollection } from "../database/db.js";

export async function createAnswer(req, res) {
    const choice = res.locals.choice;

    try {
        await choicesCollection.insertOne(choice);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function retrieveAnswers(req, res) {
    const pollId = req.params.id;

    try {
        const poll = await pollsCollection.findOne({ _id: new ObjectId(pollId) });
        if (!poll) {
            return res.sendStatus(404);
        }
        const answers = await choicesCollection.find({ pollId }).toArray();
        res.status(200).send(answers);

    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }

}