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
const express_1 = require("express");
const loadContentController_1 = __importDefault(require("../controllers/loadContentController"));
const sessionController_1 = __importDefault(require("../controllers/sessionController"));
const userModel_1 = require("../models/userModel");
const router = (0, express_1.Router)();
router.get('/', sessionController_1.default.validateSessionToken, loadContentController_1.default.getData, (req, res) => {
    return res.status(200).json(res.locals.data);
});
router.post('/insert', sessionController_1.default.validateSessionToken, loadContentController_1.default.insertRecord, (req, res) => {
    return res.status(200).end();
});
router.post('/delete', sessionController_1.default.validateSessionToken, loadContentController_1.default.deleteRecord, (req, res) => {
    return res.status(200).end();
});
router.post('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const data = yield (0, userModel_1.getUserIngredients)(email);
    if (data !== 'Failed')
        res.json(data.rows);
}));
exports.default = router;
