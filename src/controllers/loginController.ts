import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import fs, { readFileSync } from 'fs';
import aws from 'aws-sdk';
import {
  getUser,
  createLoginToken,
  updateLoginToken,
} from '../models/userModel';

const config = {
  apiVersion: '2010-12-01',
  region: 'us-east-1',
};

aws.config.update(config);
const ses = new aws.SES(config);

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, sessionToken } = req.body;

  if (typeof email !== 'string' || email.match(/.+@.+\..+/) === null) {
    return next({ message: { err: 'Invalid email input' } });
  }

  const user = await getUser(email);

  if (user === 'Failed') {
    return next({ message: { err: 'Error connecting to the database' } });
  }

  const secret = getRandomInt(100000, 1000000);

  const token = jwt.sign({ email }, secret, {
    algorithm: 'HS256',
    expiresIn: 600,
  });

  const expires = new Date(Date.now() + 1000 * 600);

  if (user.rowCount) {
    if (sessionToken && user.rows[0].sessionexpire > Date.now()) {
      try {
        await jwt.verify(sessionToken, process.env.SESSION_SECRET!);
        return next();
      } catch (e) {
        // continue
      }
    }
    // update db with token
    updateLoginToken(email, token, expires);
  } else {
    // insert db with token
    createLoginToken(email, token, expires);
  }

  try {
    await sendEmail(email, secret);
    res.cookie('email', email);
    return next();
  } catch (e) {
    console.log(e);
    return next({ message: { err: 'Error sending email' } });
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, code } = req.body;
  // const email = req.cookies.email;

  if (!code || !email) {
    return next({ message: { err: 'Missing email or code' } });
  }

  const user = await getUser(email);

  if (user === 'Failed') {
    return next({ message: { err: 'Error connecting to the database' } });
  }

  if (!user.rows[0] || user.rows[0].loginexpire < Date.now()) {
    return res.redirect('/login');
  }

  try {
    jwt.verify(user.rows[0].logintoken, code);
    return next();
  } catch (e) {
    return next({ message: { err: 'invalid secret' } });
  }
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min).toString();
}

function sendEmail(email: string, secret: string) {
  const params = {
    Source: 'noreply@juncafe.com',
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: secret,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Your access code is ${secret}`,
      },
    },
  };
  return ses.sendEmail(params).promise();
}

export default { login, authenticate };
