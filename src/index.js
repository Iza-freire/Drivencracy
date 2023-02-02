import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import pollRoutes from "./routes/poll.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import voteRoutes from "./routes/vote.routes.js"

const port = process.env.PORT || 5008;

const app = express();

app.use(express.json());
app.use(cors());

app.use(pollRoutes);
app.use(choiceRoutes);
app.use(voteRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




