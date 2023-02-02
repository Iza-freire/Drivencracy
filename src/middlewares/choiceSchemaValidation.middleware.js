import { ObjectId } from "mongodb";
import { choicesSchema } from "../models/choice.model.js";
import { pollsCollection, choicesCollection } from "../database/db.js";

export async function validateChoiceSchema(req, res, next) {

    let { title, pollId } = req.body;

    if (!title || !pollId) {
        res.sendStatus(422);
    }
    const choice = { title, pollId };

    const validationResult = choicesSchema.validate(choice, { abortEarly: true });
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details.map(detail => detail.message));
    }

    try {
        const poll = await pollsCollection.findOne({ _id: new ObjectId(pollId) });
        if (!poll) {
            return res.status(404).send({ error: 'Question not found' })
        }

        const existingChoice = await choicesCollection.findOne({ title });
        if (existingChoice) {
            return res.status(409).send({ error: 'Title already exists' })
        }

        const currentDate = new Date();
        const pollExpireDate = new Date(poll.expireAt);
        if (pollExpireDate.getTime() < currentDate.getTime()) {
            return res.status(403).send({ error: 'Question has expired' })
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    res.locals.choice = choice;

    next();
}