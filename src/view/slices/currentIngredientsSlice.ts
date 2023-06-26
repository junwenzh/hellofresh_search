import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ingredientsState {
  ingredients: string[];
}

const initialState: ingredientsState = {
  ingredients: [],
};

export const currentIngredientsSlice = createSlice({
  name: 'currentingredients',
  initialState,
  reducers: {
    setCurrentIngredients: (state, action: PayloadAction<string[]>) => {
      state.ingredients = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentIngredients } = currentIngredientsSlice.actions;

export default currentIngredientsSlice.reducer;
