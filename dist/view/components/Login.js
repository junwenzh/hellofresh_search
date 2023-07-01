"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Login() {
    const [input, setInput] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };
    const handleSubmit = () => {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: input }),
        }).finally(() => navigate('/authenticate'));
    };
    return (react_1.default.createElement("main", { className: "flex flex-col max-w-2xl mx-auto my-32 justify-center" },
        react_1.default.createElement("p", { className: "text-center text-lg" }, "Enter your email address"),
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("input", { type: "text", id: "email", value: input, onChange: handleChange, className: "px-4 py-2 my-8 mx-4 border rounded-md shadow-sm" }),
            react_1.default.createElement("button", { onClick: handleSubmit, className: "border rounded-md shadow-sm px-4 py-2 hover:cursor-pointer" }, "Submit"))));
}
exports.default = Login;
