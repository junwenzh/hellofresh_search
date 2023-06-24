// Pull data from the hellofresh API
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { duration } from 'moment';
import { ResponseBody, Item } from '../types/HFResponseBody';
import recipeModel from '../models/recipeModel';
import {
  DbRecipe,
  DbIngredient,
  DbRecipeIngredient,
  DbRecipeYield,
  DbRecipeStep,
  DbRecipeCuisine,
  DbRecipeTag,
} from '../types/DbTypes';

const getToken = async (_req: Request, res: Response, next: NextFunction) => {
  const url =
    'https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials';

  try {
    const response = await axios.post(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
      },
    });
    const token = response.data.access_token;
    res.locals.token = token;

    return next();
  } catch (e) {
    return next({ message: { err: 'Error getting token from HelloFresh' } });
  }
};

const getAllRecipes = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const ingredientMap = new Map();
  const dbIngredients = await recipeModel.rawSql?.(
    'select id from ingredients'
  );
  dbIngredients?.rows.forEach(v => ingredientMap.set(v.id, v.name));
  // console.log('db', ingredientMap);

  let offset = 0;

  while (offset >= 0) {
    let response;

    try {
      response = (await pullData(res.locals.token, offset)) as ResponseBody;
    } catch (e) {
      return next({
        message: { err: 'Error from the HelloFresh API in getAllRecipes' },
      });
    }

    if (response.count === 250) {
      offset += 250;
    } else {
      offset = -1;
    }

    for (const item of response.items as Item[]) {
      const recipeParams = getRecipeParams(item);

      const ingredientParams = item.ingredients.reduce((a, c) => {
        if (!ingredientMap.has(c.id)) {
          a.push(getIngredientParams(c));
          ingredientMap.set(c.id, c.name);
        }
        return a;
      }, [] as DbIngredient[]);

      const recipeIngredientParams = item.ingredients.map(e =>
        getRecipeIngredientParams(item.id, e.id)
      );

      const recipeYieldParams = item.yields[0]
        ? item.yields[0].ingredients.map(e =>
            getRecipeYieldParams(item.id, item.yields[0].yields, e)
          )
        : [];

      const recipeStepParams = item.steps.map(e =>
        getRecipeStepParams(item.id, e, ingredientMap)
      );

      const recipeCuisineParams = item.cuisines.map(e =>
        getRecipeCuisineParams(item.id, e.name)
      );

      const recipeTagParams = item.tags.map(e =>
        getRecipeTagParams(item.id, e.name)
      );

      await recipeModel.insertRecipe(recipeParams);

      for (const params of ingredientParams) {
        try {
          await recipeModel.insertIngredient(params);
        } catch (e) {
          console.log(`Failed at inserting ingredient ${params[0]}`);
        }
      }

      for (const params of recipeIngredientParams) {
        try {
          await recipeModel.insertRecipeIngredient(params);
        } catch (e) {
          console.log(
            `Failed at inserting yield ${params[0]} yield ${params[1]}`
          );
        }
      }

      for (const params of recipeYieldParams) {
        try {
          await recipeModel.insertRecipeYield(params);
        } catch (e) {
          console.log(
            `Failed at inserting yield ${params[0]} yield ${params[1]}`
          );
        }
      }

      for (const params of recipeStepParams) {
        try {
          await recipeModel.insertRecipeStep(params);
        } catch (e) {
          console.log(
            `Failed at inserting step ${params[0]} yield ${params[1]}`
          );
        }
      }

      for (const params of recipeCuisineParams) {
        try {
          await recipeModel.insertRecipeCuisine(params);
        } catch (e) {
          console.log(
            `Failed at inserting cuisine ${params[0]} yield ${params[1]}`
          );
        }
      }

      for (const params of recipeTagParams) {
        try {
          await recipeModel.insertRecipeTag(params);
        } catch (e) {
          console.log(
            `Failed at inserting tag ${params[0]} yield ${params[1]}`
          );
        }
      }
    }
  }
  return next();
};

async function pullData(token: string, offset: number) {
  const url = `https://gw.hellofresh.com/api/recipes/search?country=us&limit=250&offset=${offset}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
  });

  return response.data;
}

async function getImageUrl(imagePath: string): Promise<string> {
  return `https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_30,w_2600/hellofresh_s3${imagePath}`;
}

async function getIngredientUrl(imagePath: string): Promise<string> {
  return `https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_200,q_30,w_200/hellofresh_s3${imagePath}`;
}

function getRecipeParams(item: Item): DbRecipe {
  return [
    item.id,
    item.name,
    item.websiteUrl,
    item.imagePath,
    item.headline,
    item.description,
    item.category?.name || '',
    item.difficulty || 0,
    item.nutrition[0]?.amount || 0,
    duration(item.totalTime).asMinutes() || 0, // swap total and prep time
    duration(item.prepTime).asMinutes() || 0,
    item.favoritesCount || 0,
    item.ratingsCount || 0,
    item.averageRating || 0,
    item.ingredients.length,
  ];
}

function getIngredientParams(ingredient: {
  id: string;
  name: string;
  imagePath: string;
  family: { id: string; name: string };
}): DbIngredient {
  return [
    ingredient.id,
    ingredient.name,
    ingredient.imagePath,
    ingredient.family?.name || '',
    ingredient.name.includes('pantry') ? true : false,
  ];
}

function getRecipeIngredientParams(
  recipeId: string,
  ingredientId: string
): DbRecipeIngredient {
  return [recipeId, ingredientId];
}

function getRecipeYieldParams(
  recipeId: string,
  yields: number,
  ingredients: {
    id: string;
    amount: number;
    unit: string;
  }
): DbRecipeYield {
  return [
    recipeId,
    ingredients.id,
    yields && ingredients?.amount ? ingredients.amount / yields : 0,
    ingredients.unit,
  ];
}

function getRecipeStepParams(
  recipeId: string,
  step: {
    index: number;
    ingredients: string[];
    instructions: string;
  },
  ingredientMap: Map<string, string>
): DbRecipeStep {
  const ingredientsString = step.ingredients
    .map(v => ingredientMap.get(v))
    .join(',');
  return [recipeId, step.index, ingredientsString, step.instructions];
}

function getRecipeCuisineParams(
  recipeId: string,
  cuisine: string
): DbRecipeCuisine {
  return [recipeId, cuisine];
}

function getRecipeTagParams(recipeId: string, tag: string): DbRecipeTag {
  return [recipeId, tag];
}

export default {
  getToken,
  getAllRecipes,
};
