import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../types/Recipe';

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
