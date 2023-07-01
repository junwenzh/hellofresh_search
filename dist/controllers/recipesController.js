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
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
const getRecipes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { ingredients, exact } = req.body;
    if (!ingredients || !Array.isArray(ingredients))
        return next({ message: { err: 'No ingredients supplied' } });
    let sqlIn = '';
    ingredients.forEach(v => {
        sqlIn += `'${v}',`;
    });
    sqlIn = sqlIn.slice(0, -1);
    const sql = `
    select  r.id, r.name, r.websiteurl, r.imagepath, r.headline, r.description,
            r.category, r.difficulty, r.calories, r.preptime, r.totaltime,
            r.favoritescount, r.averagerating, 
            row_number() over(partition by r.name order by r.favoritescount desc) as rn
    from    ingredients i
    join    recipe_ingredients ri on i.id = ri.ingredient_id
    join    recipes r on ri.recipe_id = r.id
    where   i.name in (${sqlIn}) and i.pantry = FALSE
    group by r.id, r.name, r.websiteUrl, r.imagePath, r.headline, r.description,
            r.category, r.difficulty, r.calories, r.prepTime, r.totalTime,
            r.favoritesCount, r.averageRating
    having  r.totalingredients = count(*)
    order by r.favoritesCount desc, ratingsCount desc, averageRating desc;`;
    const results = yield ((_a = recipeModel_1.default.rawSql) === null || _a === void 0 ? void 0 : _a.call(recipeModel_1.default, sql, []));
    res.locals.count = results.rowCount;
    res.locals.recipes = results.rows;
    return next();
});
const getAdditionalData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.recipes.length)
        return next({ message: { err: 'No recipes found' } });
    for (const recipe of res.locals.recipes) {
        try {
            const data = yield Promise.allSettled([
                recipeModel_1.default.queryCuisines(recipe.id),
                recipeModel_1.default.queryIngredients(recipe.id),
                recipeModel_1.default.querySteps(recipe.id),
                recipeModel_1.default.queryTags(recipe.id),
            ]);
            recipe.cuisines =
                data[0].status === 'fulfilled' && data[0].value !== 'Failed'
                    ? data[0].value.rows
                    : [];
            recipe.ingredients =
                data[1].status === 'fulfilled' && data[1].value !== 'Failed'
                    ? data[1].value.rows
                    : [];
            recipe.steps =
                data[2].status === 'fulfilled' && data[2].value !== 'Failed'
                    ? data[2].value.rows
                    : [];
            recipe.tags =
                data[3].status === 'fulfilled' && data[3].value !== 'Failed'
                    ? data[3].value.rows
                    : [];
        }
        catch (e) {
            return next({ message: { err: 'Failed to get additional data' } });
        }
    }
    return next();
});
const getAllIngredients = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = yield recipeModel_1.default.queryAllIngredients();
        if (ingredients === 'Failed')
            return next({
                message: { err: 'Error querying database for all ingredients' },
            });
        res.locals.allIngredients = ingredients.rows;
        return next();
    }
    catch (e) {
        return next({
            message: { err: 'Error querying database for all ingredients' },
        });
    }
});
exports.default = {
    getRecipes,
    getAdditionalData,
    getAllIngredients,
};
