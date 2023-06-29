import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Recipe {
  averagerating: number;
  calories: number;
  category: string;
  cuisines: { cuisine: string }[];
  description: string;
  difficulty: number;
  favoritescount: number;
  headline: string;
  id: string;
  imagepath: string;
  ingredients: { name: string; imagepath: string }[];
  name: string;
  preptime: string;
  rn: string;
  steps: { step: number; ingredients: string; instructions: string }[];
  tags: string[];
  totaltime: string;
  websiteurl: string;
}

const initialState: Recipe[] = [];

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
