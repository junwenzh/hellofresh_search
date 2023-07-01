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
function RecipeCard(props) {
    const { recipe } = props;
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const prefix = 'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_550,q_30,w_1300/hellofresh_s3/';
    const ingredientPrefix = 'https://img.hellofresh.com/w_64,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/';
    const hideImg = (e) => {
        const target = e.target;
        target.onerror = null;
        target.classList.add('hidden');
    };
    const expandRecipe = () => {
        setExpanded(true);
    };
    return (react_1.default.createElement("article", { key: `article_${recipe.id}`, onClick: expandRecipe, className: "flex flex-col border rounded-lg shadow-md p-12 bg-gray-50/50 my-8" },
        expanded ? (react_1.default.createElement("img", { src: prefix + recipe.imagepath, onError: hideImg })) : (''),
        react_1.default.createElement("h1", { className: "mt-4 mb-2 text-3xl font-semibold" }, recipe.name),
        react_1.default.createElement("h2", { className: "my-2 pb-2 text-xl font-medium text-gray-700 border-b" }, recipe.headline),
        react_1.default.createElement("section", { className: "flex flex-nowrap my-8 pb-2 border-b" },
            react_1.default.createElement("div", { className: "basis-1 grow" },
                react_1.default.createElement("span", { className: "font-medium" }, "Cuisine: "),
                recipe.cuisines[0].cuisine),
            react_1.default.createElement("div", { className: "basis-1 grow" },
                react_1.default.createElement("span", { className: "font-medium" }, "Difficulty: "),
                recipe.difficulty),
            react_1.default.createElement("div", { className: "basis-1 grow" },
                react_1.default.createElement("span", { className: "font-medium" }, "Total Time: "),
                recipe.totaltime),
            react_1.default.createElement("div", { className: "basis-1 grow" },
                react_1.default.createElement("span", { className: "font-medium" }, "Calories: "),
                recipe.calories)),
        expanded ? (react_1.default.createElement("section", { className: "my-8 pb-2 border-b" },
            react_1.default.createElement("h2", { className: "my-4 text-xl font-semibold text-gray-800" }, "Ingredients"),
            react_1.default.createElement("div", null,
                react_1.default.createElement("ul", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" }, recipe.ingredients.map(e => {
                    return (react_1.default.createElement("li", { key: `${recipe.id}_${e.name}`, className: "list-none flex content-center items-center basis-0" },
                        e.imagepath ? (react_1.default.createElement("img", { src: ingredientPrefix + e.imagepath, alt: e.name, className: "inline mr-2 w-16 h-16" })) : (react_1.default.createElement("div", { className: "w-16 h-16 mr-2" })),
                        react_1.default.createElement("span", null,
                            e.name,
                            " ",
                            e.amount,
                            " ",
                            e.unit)));
                }))))) : (''),
        expanded ? (react_1.default.createElement("section", null,
            react_1.default.createElement("h2", { className: "my-4 text-xl font-semibold text-gray-800" }, "Steps"),
            recipe.steps.map(e => {
                return (react_1.default.createElement("div", { className: "grid grid-cols-10 pb-2 border-b my-4" },
                    react_1.default.createElement("div", { className: "col-start-1 col-end-2 " },
                        react_1.default.createElement("div", { className: "border rounded-full w-12 h-12 flex justify-center items-center bg-gray-300 text-2xl font-semibold" }, e.step)),
                    react_1.default.createElement("div", { className: "col-start-2 col-end-10 " }, e.instructions)));
            }))) : ('')));
}
exports.default = RecipeCard;
