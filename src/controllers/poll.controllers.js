import { pollsCollection } from "../database/db.js";

export async function createQuestion (req, res) {

    const questionPoll = res.locals.question;

    try {
        await pollsCollection.insertOne(questionPoll);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function retrieveQuestions (req, res) {

    try {
        const questionsPoll = await pollsCollection.find().toArray();
        res.send(questionsPoll);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}