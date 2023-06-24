import React from 'react';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    fetch('/api').then(res => res.text());
    // .then(res => console.log(res));
  }, []);

  return <div>Hello</div>;
}
