import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import Project from '../models/project.model';
import Comment from '../models/comment.model';

const URI = process.env.EXTERNAL_URI || 'postgres';

const sequelize: Sequelize = new Sequelize(URI, {
  dialectOptions: {
    ssl: true,
  },
  models: [Project, Comment],
});

async function connect(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };
};

async function connection(): Promise<void> {
  try {
    await connect();
    await sequelize.sync();
  } catch (error: any) {
    throw new Error(error.message);
  };
};

export { connection, sequelize };
