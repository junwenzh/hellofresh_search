"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

export type Ingredient = {
  id: string;
  name: string;
  imagepath: string;
};

export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "imagepath",
    header: "Image",
    cell: ({ row }) => {
      const prefix =
        "https://img.hellofresh.com/w_64,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/";
      const imagePath = (row.getValue("imagepath") || "") as string;
      const name = (row.getValue("name") || "") as string;
      return imagePath ? (
        <Image
          src={`${prefix}${imagePath}`}
          width={64}
          height={64}
          alt={name}
        />
      ) : (
        <div className="w-16 h-16" />
      );
    },
  },
];
