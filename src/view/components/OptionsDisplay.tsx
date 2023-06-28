import React from 'react';
import { useAppSelector } from '../hooks';

function OptionsDisplay() {
  const input = useAppSelector(state => state.inputText.text);
  const options = useAppSelector(state =>
    input
      ? state.allIngredients.ingredients
          .filter(text =>
            text.toLocaleLowerCase().includes(input.toLowerCase())
          )
          .sort((a, b) => {
            if (a.toLowerCase() === input.toLowerCase()) return -1;
            if (a < b) return -1;
            return 1;
          })
          .slice(0, 5)
      : []
  );

  return (
    <fieldset className="text-center my-6">
      {options.map((e, index) => {
        return (
          <div key={e} className="my-2">
            <input
              type="radio"
              id={e}
              value={e}
              name="inputIngredient"
              className="hidden peer"
            />
            <label
              htmlFor={e}
              className="block mx-auto peer-checked:bg-sky-200 px-4 py-2 rounded-md w-72 md:w-96"
            >
              {e}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default OptionsDisplay;
