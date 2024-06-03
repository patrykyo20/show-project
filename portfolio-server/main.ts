import express, {Express} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connection } from './src/utlis/db';
import errorHandler from './src/utlis/errorHandler';
import projectRouter from './src/routes/project.router';
import commentRouter from './src/routes/comment.router';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

connection();

app.use(errorHandler);
app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({extended: true}));

app.use('/projects', projectRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});

