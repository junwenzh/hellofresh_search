import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setAuthenticated } from '../slices/authenticatedSlice';
import { FaGithub } from 'react-icons/fa';

function NavBar() {
  const authenticated = useAppSelector(
    state => state.authenticated.authenticated
  );

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuthenticated(false));
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  };

  return (
    <div className="bg-gray-100">
      <nav className="flex place-content-between px-4 md:mx-auto py-8 max-w-3xl">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:cursor-pointer"
        >
          HelloFresh Recipes Search
        </Link>
        <div className="flex">
          {authenticated ? (
            <Link
              to="/"
              className="text-xl font-bold text-gray-700 hover:cursor-pointer"
              onClick={logout}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="login"
              className="text-xl font-bold text-gray-700 hover:cursor-pointer"
            >
              Login
            </Link>
          )}
          <a
            href="https://github.com/junwenzh/hellofresh_search"
            className="text-lg font-medium text-gray-700 hover:cursor-pointer flex items-center ml-4"
          >
            <FaGithub />
            <span>Github</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
