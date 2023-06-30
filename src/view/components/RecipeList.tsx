import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import RecipeCard from './RecipeCard';

// display a list of recipes that can be expanded
export default function RecipeList() {
  const recipes = useAppSelector(state => state.receipes);

  return (
    <main className="flex flex-col items-center max-w-3xl mx-auto my-12 ">
      <Link to="/" className="my-4 text-2xl font-medium text-gray-600">
        Back to home
      </Link>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <RecipeCard recipe={recipe} key={recipe.id} />
        </div>
      ))}
    </main>
  );
}
