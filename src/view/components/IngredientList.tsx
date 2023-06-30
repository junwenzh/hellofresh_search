import React from 'react';
import { useAppSelector } from '../hooks';
import Ingredient from './IngredientCard';

// display a list of added ingredients with small picture
// should be sorted
export default function IngredientList() {
  const ingredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  return (
    <section className="absolute top-10 z-0 px-8 md:px-0">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ingredients.map(e => {
          return (
            <Ingredient
              name={e.name}
              imageUrl={e.imagepath}
              key={`list_${e.name}`}
            />
          );
        })}
      </ul>
    </section>
  );
}
