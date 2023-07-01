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
  { name: 'Apple', imagepath: '/image/554a3a7cf8b25ed7288b456b.png' },
  { name: 'Arugula', imagepath: '/image/554a2fc4fd2cb9cf488b4568.png' },
  {
    name: 'Bell Pepper',
    imagepath: '/ingredients/596631bfc9fd08350247b2f2-aa0ce52c.png',
  },
  {
    name: 'Broccoli Florets',
    imagepath: '/image/55b78d35f8b25ece088b4568.png',
  },
  {
    name: 'Brussels Sprouts',
    imagepath: '/image/5566e925f8b25eda298b4567.png',
  },
  {
    name: 'Button Mushrooms',
    imagepath: '/ingredient/5566f746f8b25e242a8b4569-69a05fb6.png',
  },
  {
    name: 'Cauliflower Rice',
    imagepath: '/ingredient/61141ceb2d46d04d0953fc9b-57c082bd.png',
  },
  {
    name: 'Cilantro',
    imagepath: '/ingredient/554a3c4d4dab71716c8b456c-4339dd73.png',
  },
  {
    name: 'Coconut Milk',
    imagepath: '/ingredient/5d76cbf40dcef10011285174-c211b7cb.png',
  },
  {
    name: 'Cremini Mushrooms',
    imagepath: '/ingredient/5642260ffd2cb9dc3f8b4567-cd7f2fc3.png',
  },
  {
    name: 'Crushed Tomatoes',
    imagepath: '/ingredient/554a362efd2cb9324b8b456b-5a2c70f3.png',
  },
  {
    name: 'Cucumber',
    imagepath: '/ingredient/5550dbe9f8b25ed3468b456a-d2860748.png',
  },
  { name: 'Curry Powder', imagepath: '/image/55560f58fd2cb9891f8b4567.png' },
  {
    name: 'Feta Cheese',
    imagepath: '/ingredient/5550e0374dab71893e8b4568-860b1f11.png',
  },
  {
    name: 'Fig Jam',
    imagepath: '/ingredient/55eee003f8b25e7f6e8b4567-dfc9be36.png',
  },
  {
    name: 'Flatbreads',
    imagepath: '/ingredient/638788c53cd92d975d026527-41e3a696.png',
  },
  { name: 'Ground Pork', imagepath: '/image/55661f8afd2cb9046d8b456a.png' },
  {
    name: 'Italian Cheese Blend',
    imagepath: '/ingredient/55cca25af8b25e7b468b4567-ae6feec9.png',
  },
  {
    name: 'Italian Chicken Sausage Mix',
    imagepath: '/ingredient/595d109099052d17e837c322-626ae324.png',
  },
  { name: 'Jasmine Rice', imagepath: '/image/55b7845df8b25ed9088b4567.png' },
  { name: 'Kale', imagepath: '/image/5566ef2dfd2cb95e018b4568.png' },
  { name: 'Lemon', imagepath: '/image/554a302ffd2cb9324b8b4569.png' },
  {
    name: 'Lime',
    imagepath: '/ingredient/554a3c9efd2cb9ba4f8b456c-f32287bd.png',
  },
  {
    name: 'Parmesan Cheese',
    imagepath: '/ingredient/5550e133fd2cb9a7168b456b-fb858db7.png',
  },
  {
    name: 'Peanuts',
    imagepath: '/ingredient/55cb71b679a23c5a378b4567-c414ebe0.png',
  },
  { name: 'Pecans', imagepath: '/image/5581ac5bf8b25e51498b456c.png' },
  {
    name: 'Pork Tenderloin',
    imagepath: '/ingredient/5567235df8b25e472f8b4567-07475c37.png',
  },
  { name: 'Prosciutto', imagepath: '/image/55560e7b4dab71c5718b4567.png' },
  {
    name: 'Ramen Noodles',
    imagepath: '/ingredient/56eaaedff8b25ea9538b4567-619383e2.png',
  },
  {
    name: 'Red Cabbage & Carrot Mix',
    imagepath: '/ingredient/6092d07a42b92c36740fa934-452d74d1.png',
  },
  { name: 'Ricotta Cheese', imagepath: '/image/556621dc4dab716f7d8b456c.png' },
  { name: 'Rosemary', imagepath: '/image/55661a71f8b25e391e8b456a.png' },
  {
    name: 'Salted Caramel Mascarpone Cheesecake',
    imagepath: '/ingredient/601af2717c6dff58b00e5f8d-9e552e55.png',
  },
  {
    name: 'Shelled Edamame',
    imagepath: '/ingredient/60240135e28c112717016a80-e8bc37dc.png',
  },
  {
    name: 'Shredded Red Cabbage',
    imagepath: '/ingredient/558474e9f8b25e53718b4567-b22e3393.png',
  },
  {
    name: 'Sour Cream',
    imagepath: '/ingredient/5550e1064dab71893e8b4569-dc52e70d.png',
  },
  { name: 'Spaghetti', imagepath: '/image/556714c84dab71d30c8b4568.png' },
  { name: 'Sugar', imagepath: '/image/5566e2014dab71e3078b4568.png' },
  { name: 'Sweet Potatoes', imagepath: '/image/554a392cf8b25e1c268b4569.png' },
  {
    name: 'Tempura Batter',
    imagepath: '/ingredient/605b68588f34b72089545d98-bbbdd5f6.png',
  },
  {
    name: 'Vanilla Delight Cheesecake',
    imagepath: '/ingredient/5e8e1048975240298b795597-acf294e8.png',
  },
  {
    name: 'White Chocolate Raspberry Swirl Cheesecake',
    imagepath: '/ingredient/60ca46ce6fb7561f6911a6ac-01db6c0b.png',
  },
  {
    name: 'Zucchini',
    imagepath: '/ingredient/5553981df8b25e5d0c8b456a-9ada5be3.png',
  },
];
