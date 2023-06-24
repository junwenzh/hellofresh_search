export type DbRecipe = [
  id: string,
  name: string,
  websiteUrl: string,
  imagePath: string,
  headline: string,
  description: string,
  category: string,
  difficulty: number,
  calories: number,
  preptime: number,
  totaltime: number,
  favoritesCount: number,
  ratingscount: number,
  averagerating: number,
  totalIngredients: number
];

export type DbIngredient = [
  id: string,
  name: string,
  imagePath: string,
  family: string,
  pantry: boolean
];

export type DbRecipeIngredient = [recipe_id: string, ingredient_id: string];

export type DbRecipeYield = [
  recipe_id: string,
  ingredient_id: string,
  amount: number,
  unit: string
];

export type DbRecipeStep = [
  recipe_id: string,
  step: number,
  ingredients: string,
  instructions: string
];

export type DbRecipeCuisine = [recipe_id: string, cuisine: string];

export type DbRecipeTag = [recipe_id: string, tag: string];
