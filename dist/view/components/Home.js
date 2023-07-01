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
const hooks_1 = require("../hooks");
const InputBox_1 = __importDefault(require("./InputBox"));
const OptionsDisplay_1 = __importDefault(require("./OptionsDisplay"));
const IngredientList_1 = __importDefault(require("./IngredientList"));
const recipesSlice_1 = require("../slices/recipesSlice");
const authenticatedSlice_1 = require("../slices/authenticatedSlice");
const currentIngredientsSlice_1 = require("../slices/currentIngredientsSlice");
const inputSlice_1 = require("../slices/inputSlice");
function Home() {
    const currentIngredients = (0, hooks_1.useAppSelector)(state => state.currentIngredients.ingredients);
    const [recipeFound, setRecipeFound] = (0, react_1.useState)(true);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSearch = () => {
        if (!currentIngredients.length)
            return;
        const ingredientsArr = currentIngredients.map(e => e.name);
        fetch('/dbapi/findmatches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        })
            .then(res => res.json())
            .then(res => {
            if ('err' in res)
                throw new Error();
            const filtered = res.filter((e) => e.rn === '1');
            dispatch((0, recipesSlice_1.setRecipes)(filtered));
            dispatch((0, inputSlice_1.setText)(''));
            return navigate('/recipes');
        })
            .catch(() => {
            setRecipeFound(false);
            setTimeout(() => {
                setRecipeFound(true);
            }, 5000);
        });
    };
    (0, react_1.useEffect)(() => {
        fetch('/authenticated')
            .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                throw new Error('Failed to authenticate');
            }
        })
            .then(res => {
            if (res) {
                console.log('updated current ingredients', res);
                dispatch((0, authenticatedSlice_1.setAuthenticated)(true));
                dispatch((0, currentIngredientsSlice_1.setCurrentIngredients)(res));
            }
        })
            .catch(e => {
            console.log(e);
        });
    }, []);
    return (react_1.default.createElement("main", { className: "flex flex-col max-w-3xl mx-auto my-12 justify-center" },
        recipeFound ? ('') : (react_1.default.createElement("div", { className: "text-red-500 fixed mt-2 top-24 left-1/2 -translate-x-1/2" }, "No recipes found with the provided ingredients")),
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("button", { onClick: handleSearch, className: "my-12 px-6 py-4 border rounded-md bg-lime-200 font-semibold text-lg text-lime-800" }, "Search For Recipes")),
        react_1.default.createElement(InputBox_1.default, null),
        react_1.default.createElement("div", { className: "relative" },
            react_1.default.createElement(OptionsDisplay_1.default, null),
            react_1.default.createElement(IngredientList_1.default, null))));
}
exports.default = Home;
