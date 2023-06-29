import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import { setAllIngredients } from './slices/allIngredientsSlice';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Authenticate from './components/Authenticate';

export default function App() {
  const dispatch = useAppDispatch();

  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const allIngredients = useAppSelector(state =>
    state.allIngredients.ingredients.slice(0, 5)
  );

  const recipes = useAppSelector(state => state.receipes);

  useEffect(() => {
    fetch('/dbapi/allingredients')
      .then(res => res.json())
      .then(res => dispatch(setAllIngredients(res)));
  }, []);

  function showCurrentIngredients() {
    // console.log('current', currentIngredients);
    // console.log('all', allIngredients);
    console.log('recipes', recipes);
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="authenticate" element={<Authenticate />} />
      </Routes>
      <button onClick={showCurrentIngredients}>Show current state</button>
    </div>
  );
}
