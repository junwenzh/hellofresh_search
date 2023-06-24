import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import getRecipesRoute from './routes/recipesRoute';
import hellofreshRoute from './routes/hellofreshRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
);

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/dbapi', getRecipesRoute);

app.use('/hfapi', hellofreshRoute);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message.err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});

export default app;
