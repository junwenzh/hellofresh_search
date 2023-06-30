import React from 'react';
import { Recipe } from '../../types/Recipe';

export default function RecipeCard(
  props: React.PropsWithChildren<{ recipe: Recipe }>
) {
  const { recipe } = props;

  const prefix =
    'https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_550,q_30,w_1300/hellofresh_s3/';

  const ingredientPrefix =
    'https://img.hellofresh.com/w_64,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/';

  const hideImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.classList.add('hidden');
  };

  return (
    <article
      key={`article_${recipe.id}`}
      className="flex flex-col border rounded-lg shadow-md p-12 bg-gray-50/50 my-8"
    >
      <img src={prefix + recipe.imagepath} onError={hideImg} />
      <h1 className="mt-4 mb-2 text-3xl font-semibold">{recipe.name}</h1>
      <h2 className="my-2 pb-2 text-xl font-medium text-gray-700 border-b">
        {recipe.headline}
      </h2>
      <section className="flex flex-nowrap my-8 pb-2 border-b">
        <div className="basis-1 grow">
          <span className="font-medium">Cuisine: </span>
          {recipe.cuisines[0].cuisine}
        </div>
        <div className="basis-1 grow">
          <span className="font-medium">Difficulty: </span>
          {recipe.difficulty}
        </div>
        <div className="basis-1 grow">
          <span className="font-medium">Total Time: </span>
          {recipe.totaltime}
        </div>
        <div className="basis-1 grow">
          <span className="font-medium">Calories: </span>
          {recipe.calories}
        </div>
      </section>
      <section className="my-8 pb-2 border-b">
        <h2 className="my-4 text-xl font-semibold text-gray-800">
          Ingredients
        </h2>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recipe.ingredients.map(e => {
              return (
                <li
                  key={`${recipe.id}_${e.name}`}
                  className="list-none flex content-center items-center basis-0"
                >
                  {e.imagepath ? (
                    <img
                      src={ingredientPrefix + e.imagepath}
                      alt={e.name}
                      className="inline mr-2 w-16 h-16"
                    />
                  ) : (
                    <div className="w-16 h-16 mr-2" />
                  )}
                  <span>{e.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="my-4 text-xl font-semibold text-gray-800">Steps</h2>

        {recipe.steps.map(e => {
          return (
            <div className="grid grid-cols-10 pb-2 border-b my-4">
              <div className="col-start-1 col-end-2 ">
                <div className="border rounded-full w-12 h-12 flex justify-center items-center bg-gray-300 text-2xl font-semibold">
                  {e.step}
                </div>
              </div>
              <div className="col-start-2 col-end-10 ">{e.instructions}</div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
