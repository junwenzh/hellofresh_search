"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
const sessionController_1 = __importDefault(require("../controllers/sessionController"));
const router = (0, express_1.Router)();
router.post('/', loginController_1.default.login, (_req, res) => {
    return res.end();
});
router.post('/authenticate', loginController_1.default.authenticate, sessionController_1.default.createSessionToken, (_req, res) => {
    res.send(201);
});
exports.default = router;
