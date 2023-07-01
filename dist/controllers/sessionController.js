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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createSessionToken = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ email: res.locals.email }, process.env.SESSION_SECRET, {
        algorithm: 'HS256',
        expiresIn: 1000 * 60 * 60 * 24 * 365,
    });
    res.cookie('session', token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return next();
});
const validateSessionToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.cookies.session)
            throw new Error();
        yield jsonwebtoken_1.default.verify(req.cookies.session, process.env.SESSION_SECRET);
        res.locals.email = parseJwt(req.cookies.session).email;
        console.log('successfully validated', res.locals.email);
        return next();
    }
    catch (e) {
        return next({
            status: 400,
            message: { err: 'Invalid token. Please log in' },
        });
    }
});
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
exports.default = {
    createSessionToken,
    validateSessionToken,
};
