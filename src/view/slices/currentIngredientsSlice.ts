import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ingredientsState {
  ingredients: { name: string; imagepath: string }[];
}

const initialState: ingredientsState = {
  ingredients: [],
};

export const currentIngredientsSlice = createSlice({
  name: 'currentingredients',
  initialState,
  reducers: {
    setCurrentIngredients: (
      state,
      action: PayloadAction<{ name: string; imagepath: string }[]>
    ) => {
      state.ingredients = action.payload;
    },
    addIngredient: (
      state,
      action: PayloadAction<{ name: string; imagepath: string }>
    ) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (
      state,
      action: PayloadAction<{ name: string; imageUrl: string }>
    ) => {
      state.ingredients = state.ingredients.filter(
        e => e.name !== action.payload.name
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentIngredients, addIngredient, removeIngredient } =
  currentIngredientsSlice.actions;

export default currentIngredientsSlice.reducer;
