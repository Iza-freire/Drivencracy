import  Router  from "express";
import { createQuestion, retrieveQuestions } from "../controllers/poll.controllers.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.middleware.js";

const router = Router();

router.post("/poll", pollSchemaValidation, createQuestion);
router.get("/poll", retrieveQuestions);

export default router;