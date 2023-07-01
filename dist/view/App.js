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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("./hooks");
const allIngredientsSlice_1 = require("./slices/allIngredientsSlice");
const Home_1 = __importDefault(require("./components/Home"));
const Login_1 = __importDefault(require("./components/Login"));
const NavBar_1 = __importDefault(require("./components/NavBar"));
const Authenticate_1 = __importDefault(require("./components/Authenticate"));
const RecipeList_1 = __importDefault(require("./components/RecipeList"));
function App() {
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        fetch('/dbapi/allingredients')
            .then(res => res.json())
            .then(res => dispatch((0, allIngredientsSlice_1.setAllIngredients)(res)));
    }, []);
    return (react_1.default.createElement("div", { className: "bg-lime-50/15 min-h-screen" },
        react_1.default.createElement(NavBar_1.default, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Home_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "login", element: react_1.default.createElement(Login_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "authenticate", element: react_1.default.createElement(Authenticate_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "recipes", element: react_1.default.createElement(RecipeList_1.default, null) }))));
}
exports.default = App;
