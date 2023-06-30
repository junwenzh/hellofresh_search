import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { setAllIngredients } from './slices/allIngredientsSlice';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Authenticate from './components/Authenticate';
import RecipeList from './components/RecipeList';
import Footer from './components/Footer';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/dbapi/allingredients')
      .then(res => res.json())
      .then(res => dispatch(setAllIngredients(res)));
  }, []);

  return (
    <div className="bg-lime-50/15 min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="authenticate" element={<Authenticate />} />
        <Route path="recipes" element={<RecipeList />} />
      </Routes>
    </div>
  );
}
