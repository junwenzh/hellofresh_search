"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../hooks");
const authenticatedSlice_1 = require("../slices/authenticatedSlice");
const fa_1 = require("react-icons/fa");
function NavBar() {
    const authenticated = (0, hooks_1.useAppSelector)(state => state.authenticated.authenticated);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const logout = () => {
        dispatch((0, authenticatedSlice_1.setAuthenticated)(false));
        document.cookie.split(';').forEach(function (c) {
            document.cookie = c
                .replace(/^ +/, '')
                .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
    };
    return (react_1.default.createElement("div", { className: "bg-gray-100" },
        react_1.default.createElement("nav", { className: "flex place-content-between px-4 md:mx-auto py-8 max-w-3xl" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "text-2xl font-bold text-gray-800 hover:cursor-pointer" }, "HelloFresh Recipes Search"),
            react_1.default.createElement("div", { className: "flex" },
                authenticated ? (react_1.default.createElement(react_router_dom_1.Link, { to: "/", className: "text-xl font-bold text-gray-700 hover:cursor-pointer", onClick: logout }, "Logout")) : (react_1.default.createElement(react_router_dom_1.Link, { to: "login", className: "text-xl font-bold text-gray-700 hover:cursor-pointer" }, "Login")),
                react_1.default.createElement("a", { href: "https://github.com/junwenzh/hellofresh_search", className: "text-lg font-medium text-gray-700 hover:cursor-pointer flex items-center ml-4" },
                    react_1.default.createElement(fa_1.FaGithub, null),
                    react_1.default.createElement("span", null, "Github"))))));
}
exports.default = NavBar;
