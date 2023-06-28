import React from 'react';
import InputBox from './InputBox';
import OptionsDisplay from './OptionsDisplay';

export default function Home() {
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
    <main className="flex flex-col max-w-3xl mx-auto my-32 justify-center">
      <InputBox />
      <OptionsDisplay />
    </main>
  );
}
