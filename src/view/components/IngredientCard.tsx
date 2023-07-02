import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCurrentIngredients } from '../slices/currentIngredientsSlice';

export default function IngredientCard({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) {
  const authenticated = useAppSelector(
    state => state.authenticated.authenticated
  );

  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const dispatch = useAppDispatch();

  const removeIngredient = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const ingredient = target.previousSibling as HTMLSpanElement;
    const newIngredients = currentIngredients.filter(
      v => v.name !== ingredient.innerText
    );
    // console.log(newIngredients);
    dispatch(setCurrentIngredients(newIngredients));
    if (authenticated) {
      fetch('/authenticated/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredient: ingredient.innerText }),
      });
    }
    // console.log(currentIngredients, newIngredients);
    window.localStorage.setItem('ingredients', JSON.stringify(newIngredients));
  };

  const prefix =
    'https://img.hellofresh.com/w_64,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/';

  return (
    <li
      key={`have${name}`}
      className="list-none flex content-center items-center basis-0"
    >
      {imageUrl ? (
        <img
          src={prefix + imageUrl}
          alt={name}
          className="inline mr-2 w-16 h-16"
        />
      ) : (
        <div className="w-16 h-16 mr-2" />
      )}
      <span>{name}</span>
      <sup
        onClick={removeIngredient}
        className="text-red-600 ml-2 hover:cursor-pointer font-bold"
      >
        X
      </sup>
    </li>
  );
}
