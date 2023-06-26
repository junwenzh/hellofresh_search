import React, { useEffect } from 'react';
import InputBox from './components/InputBox';
import DisplayOptions from './components/OptionsDisplay';
import { useAppDispatch } from './hooks';
import { setAllIngredients } from './slices/allIngredientsSlice';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/dbapi/allingredients')
      .then(res => res.json())
      .then(res => dispatch(setAllIngredients(res)));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selected = document.querySelector(
      'input[name="inputIngredient"]:checked'
    ) as HTMLInputElement;
    if (!selected) return;
    const selectedValue = selected.value;
    alert(selectedValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputBox />

        <DisplayOptions />
      </form>
    </>
  );
}
