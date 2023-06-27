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
    <fieldset>
      {options.map((e, index) => {
        return (
          <div key={e}>
            <input type="radio" id={e} value={e} name="inputIngredient" />
            <label htmlFor={e}>{e}</label>
          </div>
        );
      })}
    </fieldset>
  );
}

export default OptionsDisplay;
