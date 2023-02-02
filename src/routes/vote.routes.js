import { Router }  from "express";
import { validateVotesSchema } from "../middlewares/validateVotesSchema.middleware.js";
import { createVote, retrieveVotes} from "../controllers/vote.controllers.js";

const router = Router();

router.post("/choice/:id/vote", validateVotesSchema, createVote);
router.get("/poll/:id/result", retrieveVotes);

export default router;