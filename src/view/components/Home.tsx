import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import InputBox from './InputBox';
import OptionsDisplay from './OptionsDisplay';
import IngredientList from './IngredientList';
import { setRecipes } from '../slices/recipesSlice';
import { setAuthenticated } from '../slices/authenticatedSlice';
import { setCurrentIngredients } from '../slices/currentIngredientsSlice';

export default function Home() {
  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        return navigate('/recipes');
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetch('/authenticated')
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to authenticate');
        }
      })
      .then(res => {
        if (res) {
          console.log('updated current ingredients', res);
          dispatch(setAuthenticated(true));
          dispatch(setCurrentIngredients(res));
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

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
      <div className="relative">
        <OptionsDisplay />
        <IngredientList />
      </div>
    </main>
  );
}
