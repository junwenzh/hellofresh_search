import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import InputBox from './InputBox';
import OptionsDisplay from './OptionsDisplay';
import IngredientList from './IngredientList';
import { setRecipes } from '../slices/recipesSlice';
import { setAuthenticated } from '../slices/authenticatedSlice';
import { setCurrentIngredients } from '../slices/currentIngredientsSlice';
import { setText } from '../slices/inputSlice';

export default function Home() {
  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const [recipeFound, setRecipeFound] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!currentIngredients.length) return;

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
        dispatch(setText(''));
        return navigate('/recipes');
      })
      .catch(() => {
        setRecipeFound(false);
        setTimeout(() => {
          setRecipeFound(true);
        }, 5000);
      });
  };

  useEffect(() => {
    const storedData = window.localStorage.getItem('ingredients');
    if (storedData) {
      dispatch(setCurrentIngredients(JSON.parse(storedData)));
    }
    // console.log(storedData);
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
      {recipeFound ? (
        ''
      ) : (
        <div className="text-red-500 fixed mt-2 top-24 left-1/2 -translate-x-1/2">
          No recipes found with the provided ingredients
        </div>
      )}
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
