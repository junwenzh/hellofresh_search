import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setText } from '../slices/inputSlice';

function InputBox() {
  const [selectedOption, setSelectedOption] = useState(0);
  const inputText = useAppSelector(state => state.inputText.text);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setText(e.target.value));
  };

  const handleArrowKeys = (e: KeyboardEvent<HTMLInputElement>) => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;

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
        if (options.length > 1) {
          dispatch(setText(options[selectedOption].value));
          setSelectedOption(state => 0);
        } else if (options.length === 1) {
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;

    if (options.length === 0) return;
    options[selectedOption].checked = true;
  }, [selectedOption]);

  useEffect(() => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;

    if (options.length === 0) return;
    options[0].checked = true;
  }, [inputText]);

  return (
    <input
      value={inputText}
      onChange={handleChange}
      onKeyDown={handleArrowKeys}
    />
  );
}

export default InputBox;
