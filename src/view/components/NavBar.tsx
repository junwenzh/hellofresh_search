import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function NavBar() {
  const handleClick = () => {};

  return (
    <div className="bg-gray-100">
      <nav className="flex place-content-between px-4 md:mx-auto py-8 max-w-3xl">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          HelloFresh Recipes Search
        </Link>
        <Link to="login" className="text-xl font-bold text-gray-700">
          Login
        </Link>
        <Link to="Authenticate" className="text-xl font-bold text-gray-700">
          Authenticate
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
