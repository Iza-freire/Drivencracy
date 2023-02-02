import Joi from "joi";

export const choicesSchema = Joi.object({
    title: Joi.string().required(),
	pollId: Joi.string().min(12).max(24).required()
});