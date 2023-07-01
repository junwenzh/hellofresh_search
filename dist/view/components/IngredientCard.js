"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../hooks");
const currentIngredientsSlice_1 = require("../slices/currentIngredientsSlice");
function IngredientCard({ name, imageUrl, }) {
    const authenticated = (0, hooks_1.useAppSelector)(state => state.authenticated.authenticated);
    const currentIngredients = (0, hooks_1.useAppSelector)(state => state.currentIngredients.ingredients);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const removeIngredient = (e) => {
        const target = e.target;
        const ingredient = target.previousSibling;
        dispatch((0, currentIngredientsSlice_1.setCurrentIngredients)(currentIngredients.filter(v => v.name !== ingredient.innerText)));
        if (authenticated) {
            fetch('/authenticated/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredient: ingredient.innerText }),
            });
        }
    };
    const prefix = 'https://img.hellofresh.com/w_64,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/';
    return (react_1.default.createElement("li", { key: `have${name}`, className: "list-none flex content-center items-center basis-0" },
        imageUrl ? (react_1.default.createElement("img", { src: prefix + imageUrl, alt: name, className: "inline mr-2 w-16 h-16" })) : (react_1.default.createElement("div", { className: "w-16 h-16 mr-2" })),
        react_1.default.createElement("span", null, name),
        react_1.default.createElement("sup", { onClick: removeIngredient, className: "text-red-600 ml-2 hover:cursor-pointer font-bold" }, "X")));
}
exports.default = IngredientCard;
