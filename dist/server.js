"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const recipesRoute_1 = __importDefault(require("./routes/recipesRoute"));
const hellofreshRoute_1 = __importDefault(require("./routes/hellofreshRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const authenticatedRoute_1 = __importDefault(require("./routes/authenticatedRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.use('/dbapi', recipesRoute_1.default);
app.use('/hfapi', hellofreshRoute_1.default);
app.use('/login', loginRoute_1.default);
app.use('/authenticated', authenticatedRoute_1.default);
app.use((err, _req, res, _next) => {
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
exports.default = app;
