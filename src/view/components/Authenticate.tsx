import React, { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { setCurrentIngredients } from '../slices/currentIngredientsSlice';

export default function Authenticate() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input.length === 6) {
      fetch('/login/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code: input }),
      })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 201) {
            return navigate('/');
          } else {
            setInput('');
            setStatus(true);
            throw new Error('Failed to authenticate');
          }
        })
        .then(res => {
          console.log(res);
          // dispatch(setCurrentIngredients(res));
          return navigate('/');
        })
        .catch(e => console.log(e));
    }
  }, [input]);

  return (
    <main className="flex flex-col max-w-2xl mx-auto my-32 justify-center">
      <p className="text-center text-lg">Enter the access code</p>
      {status ? (
        <p className="text-center text-red-500">Incorrect access code</p>
      ) : (
        ''
      )}
      <div className="text-center">
        <input
          type="text"
          id="code"
          value={input}
          onChange={handleChange}
          className="px-4 py-2 my-8 mx-4 border rounded-md shadow-sm text-center"
        />
      </div>
    </main>
  );
}
