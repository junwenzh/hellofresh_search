import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import getRecipesRouter from './routes/recipesRoute';
import hellofreshRouter from './routes/hellofreshRoute';
import loginRouter from './routes/loginRoute';
import authenticatedRouter from './routes/authenticatedRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../dist')));

// app.get('/', (_req, res) =>
//   res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
// );

app.use('/dbapi', getRecipesRouter);

app.use('/hfapi', hellofreshRouter);

app.use('/login', loginRouter);

app.use('/authenticated', authenticatedRouter);

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

app.listen(8083, () => {
  console.log('Server listening on port: 8083');
});

export default app;
