import { configureStore } from '@reduxjs/toolkit';
import allIngredientsReducer from './slices/allIngredientsSlice';
import currentIngredientsReducer from './slices/currentIngredientsSlice';
import optionsReducer from './slices/optionsSlice';
import inputReducer from './slices/inputSlice';
import recipesReducer from './slices/recipesSlice';
import authenticatedReducer from './slices/authenticatedSlice';

export const store = configureStore({
  reducer: {
    allIngredients: allIngredientsReducer,
    currentIngredients: currentIngredientsReducer,
    options: optionsReducer,
    inputText: inputReducer,
    receipes: recipesReducer,
    authenticated: authenticatedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
