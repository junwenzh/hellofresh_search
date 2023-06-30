import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setText } from '../slices/inputSlice';
import { addIngredient } from '../slices/currentIngredientsSlice';

function InputBox() {
  const [selectedOption, setSelectedOption] = useState(0);
  const inputText = useAppSelector(state => state.inputText.text);
  // const authenticated = useAppSelector(
  //   state => state.authenticated.authenticated
  // );
  // const currentIngredients = useAppSelector(
  //   state => state.currentIngredients.ingredients
  // );

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setText(e.target.value));
  };

  const handleArrowKeys = (e: KeyboardEvent<HTMLInputElement>) => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;

    const selected = options[selectedOption]?.value;
    const imagepath = options[selectedOption]?.getAttribute('data-img');

    let newState;

    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        newState = selectedOption - 1;
        if (newState >= 0 && newState < options.length)
          setSelectedOption(newState);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newState = selectedOption + 1;
        if (newState >= 0 && newState < options.length)
          setSelectedOption(newState);
        break;
      case 'Enter':
        e.preventDefault();
        if (inputText === selected) {
          addItem();
          dispatch(setText(''));
          insertRecord(selected, imagepath || '');
        } else if (selected) {
          dispatch(setText(options[selectedOption].value));
          setSelectedOption(state => 0);
        }
        break;
      default:
        return;
    }
  };

  const addItem = () => {
    const selected = document.querySelector(
      'input[name="inputIngredient"]'
    ) as HTMLInputElement;
    if (!selected) return;
    dispatch(
      addIngredient({
        name: selected.value,
        imagepath: selected.getAttribute('data-img')!,
      })
    );
  };

  const insertRecord = (ingredient: string, imagepath: string) => {
    fetch('/authenticated/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredient, imagepath }),
    });
  };

  useEffect(() => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;

    if (options.length === 0) return;
    options[selectedOption].checked = true;
  }, [selectedOption, inputText]);

  return (
    <div className="text-center">
      <input
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleArrowKeys}
        placeholder="Start typing an ingredient"
        className="px-4 py-2 text-lg w-72 md:w-96 border rounded-md shadow-sm text-center"
      />
      <button
        id="btnAdd"
        onClick={addItem}
        className="mx-4 px-4 py-2 border rounded-md shadow-sm"
      >
        Add
      </button>
    </div>
  );
}

export default InputBox;
