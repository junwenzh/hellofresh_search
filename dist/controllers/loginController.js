"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = require("../models/userModel");
dotenv_1.default.config();
const config = {
    apiVersion: '2010-12-01',
    region: process.env.AWS_REGION,
};
aws_sdk_1.default.config.update(config);
const ses = new aws_sdk_1.default.SES(config);
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (typeof email !== 'string' || email.match(/.+@.+\..+/) === null) {
        return next({ message: { err: 'Invalid email input' } });
    }
    const user = yield (0, userModel_1.getUser)(email);
    if (user === 'Failed') {
        return next({ message: { err: 'Error connecting to the database' } });
    }
    const secret = getRandomInt(100000, 1000000);
    const token = jsonwebtoken_1.default.sign({ email: email }, secret, {
        algorithm: 'HS256',
        expiresIn: 600,
    });
    if (user.rowCount) {
        (0, userModel_1.updateLoginToken)(email, token);
    }
    else {
        (0, userModel_1.createLoginToken)(email, token);
    }
    try {
        yield sendEmail(email, secret);
        res.cookie('email', email);
        return next();
    }
    catch (e) {
        console.log('Error sending email');
        return next({ message: { err: 'Error sending email' } });
    }
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const email = req.cookies.email;
    if (!code || !email) {
        return next({ message: { err: 'Missing email or code' } });
    }
    const user = yield (0, userModel_1.getUser)(email);
    if (user === 'Failed') {
        return next({ message: { err: 'Error connecting to the database' } });
    }
    if (!user.rows[0] || user.rows[0].loginexpire < Date.now()) {
        return res.redirect('/login');
    }
    try {
        jsonwebtoken_1.default.verify(user.rows[0].token, code);
        res.locals.email = email;
        return next();
    }
    catch (e) {
        return next({ message: { err: 'invalid secret' } });
    }
});
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min).toString();
}
function sendEmail(email, secret) {
    const params = {
        Source: process.env.AWS_FROM_EMAIL,
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
exports.default = { login, authenticate };
