import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ingredientsState {
  ingredients: { name: string; imagepath: string }[];
}

const initialState: ingredientsState = {
  ingredients: [],
};

export const allIngredientsSlice = createSlice({
  name: 'allingredients',
  initialState,
  reducers: {
    setAllIngredients: (
      state,
      action: PayloadAction<{ name: string; imagepath: string }[]>
    ) => {
      state.ingredients = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAllIngredients } = allIngredientsSlice.actions;

export default allIngredientsSlice.reducer;
