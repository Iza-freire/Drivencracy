import { Router }  from "express";
import { validatepollSchema } from "../middlewares/validatepollSchema.middleware.js";
import { createQuestion, retrieveQuestions } from "../controllers/poll.controllers.js";


const router = Router();

router.post("/poll", validatepollSchema, createQuestion);
router.get("/poll", retrieveQuestions);

export default router;

