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
const hooks_1 = require("../hooks");
function Authenticate() {
    const [input, setInput] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };
    (0, react_1.useEffect)(() => {
        if (input.length === 6) {
            fetch('/login/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ code: input }),
            })
                .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                else if (res.status === 201) {
                    return navigate('/');
                }
                else {
                    setInput('');
                    setStatus(true);
                    throw new Error('Failed to authenticate');
                }
            })
                .then(res => {
                console.log(res);
                return navigate('/');
            })
                .catch(e => console.log(e));
        }
    }, [input]);
    return (react_1.default.createElement("main", { className: "flex flex-col max-w-2xl mx-auto my-32 justify-center" },
        react_1.default.createElement("p", { className: "text-center text-lg" }, "Enter the access code"),
        status ? (react_1.default.createElement("p", { className: "text-center text-red-500" }, "Incorrect access code")) : (''),
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("input", { type: "text", id: "code", value: input, onChange: handleChange, className: "px-4 py-2 my-8 mx-4 border rounded-md shadow-sm text-center" }))));
}
exports.default = Authenticate;
