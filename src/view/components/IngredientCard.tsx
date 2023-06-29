import React from 'react';

export default function IngredientCard({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) {
  return (
    <li
      key={`have${name}`}
      className="list-none flex content-center items-center basis-0"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="inline mr-2 w-16 h-16" />
      ) : (
        <div className="w-16 h-16 mr-2" />
      )}
      {name}
    </li>
  );
}
