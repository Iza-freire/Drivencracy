import { Router } from "express";
import { validateChoiceSchema } from "../middlewares/choiceSchemaValidation.middleware.js";
import { createAnswer, retrieveAnswers } from "../controllers/choice.controllers.js";


const router = Router();

router.post("/choice", validateChoiceSchema, createAnswer);
router.get("/poll/:id/choice", retrieveAnswers);

export default router;