import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection } from "../database/db.js";


export async function validateVotesSchema(req, res, next) {
    
    const choiceId = req.params.id;

    try {
        const choice = await choicesCollection.findOne({ _id: new ObjectId(choiceId) });

        if (!choice) {
            return res.status(404).send({ error: 'Option does not exist' });
        }


        const currentDate = new Date();
        const question = await pollsCollection.findOne({ _id: new ObjectId(choice.pollId) });
        const pollExpireDate = new Date(question.expireAt);
        if (pollExpireDate.getTime() < currentDate.getTime()) {
            return res.status(403).send({ error: 'Poll has expired' });
        }


        const vote = {
            voteDate: currentDate,
            choiceId: choiceId,
        };


        res.locals.vote = vote;

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    next();
}

