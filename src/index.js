import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 5008;


const app = express();

app.use(express.json());
app.use(cors());





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




