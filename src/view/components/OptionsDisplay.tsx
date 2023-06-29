import React from 'react';
import { useAppSelector } from '../hooks';

function OptionsDisplay() {
  const input = useAppSelector(state => state.inputText.text);
  const options = useAppSelector(state =>
    input
      ? state.allIngredients.ingredients
          .filter(text => text.name.toLowerCase().includes(input.toLowerCase()))
          .sort((a, b) => {
            if (a.name.toLowerCase() === input.toLowerCase()) return -1;
            if (a.name < b.name) return -1;
            return 1;
          })
          .slice(0, 10)
      : []
  );

  return (
    <fieldset className="text-center my-6">
      {options.map((e, index) => {
        return (
          <div key={e.name} className="my-2">
            <input
              type="radio"
              id={`option_${e.name}`}
              value={e.name}
              name="inputIngredient"
              className="hidden peer"
              data-img={e.imagepath}
            />
             
            <label
              htmlFor={`option_${e.name}`}
              className="block mx-auto peer-checked:bg-sky-200 px-4 py-2 rounded-md w-72 md:w-96"
            >
              {e.name}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default OptionsDisplay;