import Joi from "joi";

export const pollsSchema = Joi.object({
    title: Joi.string().min(2).required(),
	expireAt: Joi.date().required()
});