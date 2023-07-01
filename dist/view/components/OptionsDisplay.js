"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../hooks");
function OptionsDisplay() {
    const input = (0, hooks_1.useAppSelector)(state => state.inputText.text);
    const options = (0, hooks_1.useAppSelector)(state => input
        ? state.allIngredients.ingredients
            .filter(text => text.name.toLowerCase().includes(input.toLowerCase()))
            .sort((a, _b) => {
            if (a.name.toLowerCase() === input.toLowerCase())
                return -1;
            return 0;
        })
            .slice(0, 10)
        : []);
    return (react_1.default.createElement("fieldset", { className: "text-center my-6 z-10 absolute left-1/2 -translate-x-1/2 bg-white" }, options.map((e, index) => {
        return (react_1.default.createElement("div", { key: e.name, className: "my-2" },
            react_1.default.createElement("input", { type: "radio", id: `option_${e.name}`, value: e.name, name: "inputIngredient", className: "hidden peer", "data-img": e.imagepath }),
            react_1.default.createElement("label", { htmlFor: `option_${e.name}`, className: "block mx-auto peer-checked:bg-sky-200 px-4 py-2 rounded-md w-72 md:w-96" }, e.name)));
    })));
}
exports.default = OptionsDisplay;
