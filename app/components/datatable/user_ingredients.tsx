import { Ingredient, columns } from './columns';
import { DataTable } from './datatable';

export default async function UserIngredients() {
  const response = await fetch('http://localhost:3000/api/user_ingredients', {
    cache: 'no-store',
  });

  const data = (await response.json()) as Ingredient[];

  return <DataTable columns={columns} data={data} />;
}
