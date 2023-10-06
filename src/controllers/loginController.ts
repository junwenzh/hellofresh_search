import aws from 'aws-sdk';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  createLoginToken,
  getUser,
  updateLoginToken,
} from '../models/userModel';

dotenv.config();

const config = {
  apiVersion: '2010-12-01',
  region: process.env.AWS_REGION,
};

aws.config.update(config);
const ses = new aws.SES(config);

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (typeof email !== 'string' || email.match(/.+@.+\..+/) === null) {
    return next({ message: { err: 'Invalid email input' } });
  }

  const user = await getUser(email);

  if (user === 'Failed') {
    return next({ message: { err: 'Error connecting to the database' } });
  }

  const secret = getRandomInt(100000, 1000000);

  const token = jwt.sign({ email: email }, secret, {
    algorithm: 'HS256',
    expiresIn: 600,
  });

  if (user.rowCount) {
    updateLoginToken(email, token);
  } else {
    // insert db with token
    createLoginToken(email, token);
  }

  try {
    await sendEmail(email, secret);
    res.cookie('email', email);
    return next();
  } catch (e) {
    console.log('Error sending email');
    return next({ message: { err: 'Error sending email' } });
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;
  const email = req.cookies.email;

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
    const x = jwt.verify(user.rows[0].token, code);
    res.locals.email = email;
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
    Source: process.env.AWS_FROM_EMAIL!,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: `Your access code is ${secret}`,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: secret,
        },
      },
    },
  };
  return ses.sendEmail(params).promise();
}

export default { login, authenticate };
