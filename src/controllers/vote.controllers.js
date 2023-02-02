import { ObjectId } from "mongodb";
import { choicesCollection, pollsCollection, votesCollection } from "../database/db.js";

export async function createVote (req, res) {

    try {
        const vote = res.locals.vote;
        await votesCollection.insertOne(vote);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function retrieveVotes (req, res) {
    

    try {
        const pollId = req.params.id;

        const question = await pollsCollection.findOne({ _id: new ObjectId(pollId) });
        if (!question) {
            res.sendStatus(404);
            return;
        }
        const answers = await choicesCollection.find({ pollId: pollId }).toArray();
        const votes = await votesCollection.find().toArray();
        
        let voteCounts = [];
        for (const answer of answers) {
            let count = votes.reduce((acc, cur) => cur.choiceId === answer._id.toString() ? acc + 1 : acc, 0);
            voteCounts.push(count);
        }
        const mostVotedIndex = voteCounts.indexOf(Math.max(...voteCounts));

        const result = {
            _id: pollId,
            title: question.title,
            expireAt: question.expireAt,
            result: {
                title: answers[mostVotedIndex].title,
                votes: voteCounts[mostVotedIndex]
            }
        };

        res.send(result);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
