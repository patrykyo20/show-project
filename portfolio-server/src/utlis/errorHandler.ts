import { Request, Response, NextFunction } from 'express';
import { sequelize } from './db';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', error);
  sequelize.close().then(() => console.log('Sequelize connection closed'));
};

export default errorHandler;