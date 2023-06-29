import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: input }),
    }).finally(() => navigate('/authenticate'));
  };

  return (
    <main className="flex flex-col max-w-2xl mx-auto my-32 justify-center">
      <p className="text-center text-lg">Enter your email address</p>
      <div className="text-center">
        <input
          type="text"
          id="email"
          value={input}
          onChange={handleChange}
          className="px-4 py-2 my-8 mx-4 border rounded-md shadow-sm"
        />
        <button
          onClick={handleSubmit}
          className="border rounded-md shadow-sm px-4 py-2 hover:cursor-pointer"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
