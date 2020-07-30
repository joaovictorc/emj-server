import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '../../errors/AppError';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', mmessage: err.message });
  }
  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Backend started on port 3333!');
});
