import Joi from "joi";

export const pollsSchema = Joi.object({
    title: Joi.string().required(),
	expireAt: Joi.date().required()
});