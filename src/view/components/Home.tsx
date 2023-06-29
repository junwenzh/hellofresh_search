import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import InputBox from './InputBox';
import OptionsDisplay from './OptionsDisplay';
import IngredientList from './IngredientList';
import { setRecipes } from '../slices/recipesSlice';

export default function Home() {
  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const dispatch = useAppDispatch();

  const handleSearch = () => {
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
        if ('err' in res) throw new Error();
        const filtered = res.filter((e: any) => e.rn === '1');
        dispatch(setRecipes(filtered));
      })
      .catch(e => console.log(e));
  };

  return (
    <main className="flex flex-col max-w-3xl mx-auto my-12 justify-center">
      <div className="text-center">
        <button
          onClick={handleSearch}
          className="my-12 px-6 py-4 border rounded-md bg-lime-200 font-semibold text-lg text-lime-800"
        >
          Search For Recipes
        </button>
      </div>
      <InputBox />
      <OptionsDisplay />
      <IngredientList />
    </main>
  );
}
