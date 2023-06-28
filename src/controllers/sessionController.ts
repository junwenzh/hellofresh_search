import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createSessionToken = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = jwt.sign(
    { email: res.locals.email },
    process.env.SESSION_SECRET!,
    {
      algorithm: 'HS256',
      expiresIn: 60 * 60 * 24 * 365,
    }
  );

  res.cookie('session', token);
  return next();
};

const validateSessionToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.cookies.session) throw new Error();
    await jwt.verify(req.cookies.session, process.env.SESSION_SECRET!);
    res.locals.email = parseJwt(req.cookies.session).email;
    console.log(1);
    return next();
  } catch (e) {
    return next();
  }
};

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export default {
  createSessionToken,
  validateSessionToken,
};
