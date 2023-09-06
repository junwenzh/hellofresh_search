import { Ingredient, columns } from "./components/datatable/columns";
import { DataTable } from "./components/datatable/datatable";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/ingredients", {
    cache: "no-store",
  });

  const data = (await response.json()) as Ingredient[];

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-sm">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
