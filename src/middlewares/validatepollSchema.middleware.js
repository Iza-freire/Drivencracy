import { pollsSchema } from "../models/poll.model.js";

export function validatepollSchema(req, res, next) {

    let { title, expireAt = '' } = req.body;


    if (!title) {
        return res.status(422).send({ error: 'Title is required' });
    }

    if (!expireAt) {
        const now = new Date();
        const defaultExpireAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const parsedExpireAt = expireAt ? new Date(expireAt) : defaultExpireAt;
        expireAt = parsedExpireAt.toISOString().slice(0, 16);
    }

    const question = {
        title,
        expireAt: expireAt.slice(0, 16)
    };
  
    const { error } = pollsSchema.validate(question, { abortEarly: true });
  
    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
  
    res.locals.question = question;

    next();
}