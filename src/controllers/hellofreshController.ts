// Pull data from the hellofresh API
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ResponseBody, Item } from '../types/HFResponseBody';
import pullData from '../libs/pullData';
import Recipe from '../classes/Recipe';

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
  if (req.query.pass === process.env.GET_ALL_PASS) {
    let offset = 0;

    while (offset >= 0) {
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
            item.category.name,
            item.difficulty,
            item.nutrition,
            item.prepTime,
            item.totalTime,
            item.favoritesCount,
            item.ratingsCount,
            item.averageRating,
            item.ingredients
          );
        }
      } catch (e) {
        break;
      }
    }

    return next();
  } else {
    return next({ status: 400, message: { err: 'Invalid password' } });
  }
};

export default hellofreshController;
