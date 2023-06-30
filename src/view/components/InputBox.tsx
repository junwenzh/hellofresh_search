import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setText } from '../slices/inputSlice';
import {
  addIngredient,
  setCurrentIngredients,
} from '../slices/currentIngredientsSlice';

function InputBox() {
  const [selectedOption, setSelectedOption] = useState(0);
  const inputText = useAppSelector(state => state.inputText.text);
  const authenticated = useAppSelector(
    state => state.authenticated.authenticated
  );
  const currentIngredients = useAppSelector(
    state => state.currentIngredients.ingredients
  );

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setText(e.target.value));
  };

  const handleArrowKeys = (e: KeyboardEvent<HTMLInputElement>) => {
    const options = document.querySelectorAll(
      'input[name="inputIngredient"]'
    ) as NodeListOf<HTMLInputElement>;
    let index = 0;
    for (let i = 0; i < options.length; i++) {
      if (options[i].checked === true) {
        index = i;
        break;
      }
    }

    const selected = options[index]?.value;
    const imagepath = options[index]?.getAttribute('data-img');

    let newState;

    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault();
        newState = index - 1;
        if (newState >= 0 && newState < options.length)
          setSelectedOption(newState);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newState = index + 1;
        if (newState >= 0 && newState < options.length)
          setSelectedOption(newState);
        break;
      case 'Enter':
        e.preventDefault();
        if (inputText === selected) {
          addItem();
          if (authenticated) {
            insertRecord(selected, imagepath || '');
          }
        } else if (selected) {
          dispatch(setText(options[index].value));
          setSelectedOption(state => 0);
        }
        break;
      default:
        return;
    }
  };

  const addItem = () => {
    const selected = document.querySelector(
      'input[name="inputIngredient"]:checked'
    ) as HTMLInputElement;
    if (!selected) return;
    if (currentIngredients.filter(e => e.name === selected.value).length)
      return;
    dispatch(setText(''));
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

  const loadSamples = () => {
    dispatch(setCurrentIngredients(samples));
  };

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
      <button
        id="btnLoadSamples"
        onClick={loadSamples}
        className="mx-4 px-4 py-2 border rounded-md shadow-sm"
      >
        Load Samples
      </button>
    </div>
  );
}

export default InputBox;

const samples = [
  {
    name: 'Yukon Gold Potatoes',
    imagepath: '/ingredient/554a3abff8b25e1d268b456d-bb4a9f50.png',
  },
  {
    name: 'Sour Cream',
    imagepath: '/ingredient/5550e1064dab71893e8b4569-dc52e70d.png',
  },
  { name: 'Shallot', imagepath: '/image/554a3dfbf8b25e1d268b456f.png' },
  {
    name: 'Sirloin Steak',
    imagepath: '/ingredient/5550da9f4dab71e3118b456a-3cb74543.png',
  },
  {
    name: 'Vegetable Oil',
    imagepath: '/ingredients/5566d4f94dab715a078b4568-7c93a003.png',
  },
  { name: 'Kale', imagepath: '/image/5566ef2dfd2cb95e018b4568.png' },
  {
    name: 'Black Peppercorns',
    imagepath: '/image/565dc2bf79a23ce1658b4567.png',
  },
  {
    name: 'Beef Stock Concentrate',
    imagepath: '/ingredient/563a4afbf8b25e1f3c8b4567-acbd70cb.png',
  },
  { name: 'Kosher Salt', imagepath: '/image/5566ceb7fd2cb95f7f8b4567.png' },
  { name: 'Pepper', imagepath: '/image/5566dc00f8b25e5b298b4568.png' },
  { name: 'Butter', imagepath: '/image/5566e4d74dab71e3078b4569.png' },
  {
    name: 'Balsamic Vinegar',
    imagepath: '/image/554a3879fd2cb9ba4f8b456a.png',
  },
  { name: 'Kosher Salt', imagepath: '/image/5566ceb7fd2cb95f7f8b4567.png' },
  { name: 'Mustard Seeds', imagepath: '/image/56b0c814f8b25e50078b4567.png' },
  {
    name: 'Yukon Gold Potatoes',
    imagepath: '/ingredient/554a3abff8b25e1d268b456d-bb4a9f50.png',
  },
  {
    name: 'Cranberry Jam',
    imagepath: '/ingredients/58346dc7b32fbe179c589f71-1dcf659b.png',
  },
  {
    name: 'White Wine Vinegar',
    imagepath: '/image/5550dc7bfd2cb974658b456a.png',
  },
  { name: 'Yellow Onion', imagepath: '/image/554a35b7fd2cb9ba4f8b4568.png' },
  {
    name: 'Sirloin Steak',
    imagepath: '/ingredient/5550da9f4dab71e3118b456a-3cb74543.png',
  },
  { name: 'Sugar', imagepath: '/image/5566e2014dab71e3078b4568.png' },
  { name: 'Pepper', imagepath: '/image/5566dc00f8b25e5b298b4568.png' },
  { name: 'Olive Oil', imagepath: '/image/5566cdf2f8b25e0d298b4568.png' },
  { name: 'Rosemary', imagepath: '/image/55661a71f8b25e391e8b456a.png' },
  { name: 'Soy Sauce', imagepath: '/image/5550dc4afd2cb9a7168b4568.png' },
  {
    name: 'Vegetable Oil',
    imagepath: '/ingredients/5566d4f94dab715a078b4568-7c93a003.png',
  },
  {
    name: 'Shredded Red Cabbage',
    imagepath: '/ingredient/558474e9f8b25e53718b4567-b22e3393.png',
  },
  {
    name: 'Dried Oregano',
    imagepath: '/ingredient/5566de3b4dab715b078b456a-933a1536.png',
  },
  { name: 'Olive Oil', imagepath: '/image/5566cdf2f8b25e0d298b4568.png' },
  { name: 'Kosher Salt', imagepath: '/image/5566ceb7fd2cb95f7f8b4567.png' },
  { name: 'Pepper', imagepath: '/image/5566dc00f8b25e5b298b4568.png' },
  {
    name: 'Roma Tomato',
    imagepath: '/ingredient/55539a474dab7106578b4569-a580bdf4.png',
  },
  {
    name: 'Panko Breadcrumbs',
    imagepath: '/ingredient/554a39a04dab71626c8b456b-ad74bb9c.png',
  },
  {
    name: 'Mozzarella Cheese',
    imagepath: '/image/57484aea4dab71ac228b4567.png',
  },
  { name: 'Chicken Breasts', imagepath: '/image/554a2efafd2cb9ce488b4567.png' },
  {
    name: 'Paprika',
    imagepath: '/ingredient/5696c0824dab71d3408b4567-38d57946.png',
  },
  {
    name: 'Yukon Gold Potatoes',
    imagepath: '/ingredient/554a3abff8b25e1d268b456d-bb4a9f50.png',
  },
  {
    name: 'Fresh Mozzarella',
    imagepath: '/image/55672a724dab71a60d8b4568.png',
  },
  { name: 'Chicken Breasts', imagepath: '/image/554a2efafd2cb9ce488b4567.png' },
  { name: 'Lemon', imagepath: '/image/554a302ffd2cb9324b8b4569.png' },
  { name: 'Orzo Pasta', imagepath: '/image/5566f47d4dab7124088b456b.png' },
  { name: 'Parsley', imagepath: '/image/5553930af8b25e5e0c8b4569.png' },
  {
    name: 'Roma Tomato',
    imagepath: '/ingredient/55539a474dab7106578b4569-a580bdf4.png',
  },
  {
    name: 'Zucchini',
    imagepath: '/ingredient/5553981df8b25e5d0c8b456a-9ada5be3.png',
  },
  { name: 'Kosher Salt', imagepath: '/image/5566ceb7fd2cb95f7f8b4567.png' },
  { name: 'Olive Oil', imagepath: '/image/5566cdf2f8b25e0d298b4568.png' },
  { name: 'Pepper', imagepath: '/image/5566dc00f8b25e5b298b4568.png' },
  {
    name: 'Italian Seasoning',
    imagepath: '/image/561554d5fd2cb97e5e8b4567.png',
  },
  {
    name: 'Panko Breadcrumbs',
    imagepath: '/ingredient/554a39a04dab71626c8b456b-ad74bb9c.png',
  },
  {
    name: 'Parmesan Cheese',
    imagepath: '/ingredient/5550e133fd2cb9a7168b456b-fb858db7.png',
  },
  {
    name: 'Vegetable Oil',
    imagepath: '/ingredients/5566d4f94dab715a078b4568-7c93a003.png',
  },
];
