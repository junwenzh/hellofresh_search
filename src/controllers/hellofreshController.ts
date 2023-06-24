// Pull data from the hellofresh API
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ResponseBody, Item } from '../types/HFResponseBody';
import pullData from '../libs/pullData';
import Recipe from '../classes/Recipe';
import recipeModel from '../models/recipeModel';

const hellofreshController: { [key: string]: any } = {};

hellofreshController.getToken = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const url =
    'https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials';

  const response = await axios.post(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
  });
  const token = response.data.access_token;
  res.locals.token = token;

  return next();
};

hellofreshController.getRecipeById = async (
  token: string,
  id: string
): Promise<ResponseBody> => {
  const url = `https://gw.hellofresh.com/api/recipes/search?country=us&id=${id}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    },
  });

  return response.data.items[0];
};

hellofreshController.getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('In getAllRecipes');
  const ingredientMap = new Map();
  const dbIngredients = await recipeModel.rawSql?.(
    'select * from ingredients',
    []
  );
  dbIngredients?.rows.forEach(v => ingredientMap.set(v.name, v.id));

  let offset = 0;

  while (offset >= 0) {
    // console.log('In while loop');
    try {
      const response = (await pullData(
        res.locals.token,
        offset
      )) as ResponseBody;

      if (response.count === 250) {
        offset += 250;
      } else {
        offset = -1;
      }

      for (const item of response.items as Item[]) {
        const recipe = new Recipe(
          item.id,
          item.name,
          item.category?.name,
          item.difficulty,
          item.nutrition,
          item.prepTime,
          item.totalTime,
          item.favoritesCount,
          item.ratingsCount,
          item.averageRating,
          item.ingredients,
          item.steps
        );

        await recipeModel.insertRecipe?.(recipe);

        for (const { name } of recipe.ingredients) {
          if (!ingredientMap.has(name)) {
            const newId = ingredientMap.size + 1;
            ingredientMap.set(name, newId);
            await recipeModel.insertIngredient?.(newId, name);
          }

          await recipeModel.insertRecipeIngredients?.(
            recipe.id,
            ingredientMap.get(name)
          );
        }

        for (const step of recipe.steps) {
          await recipeModel.insertSteps?.(
            recipe.id,
            step.index,
            step.instructions
          );
        }
      }
    } catch (e) {
      console.log(e);
      return next({ message: { err: 'Error in getAllRecipes' } });
    }
  }

  return next();
};

export default hellofreshController;
