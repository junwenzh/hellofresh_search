import { NextRequest, NextResponse } from "next/server";

import { getAllIngredients } from "@/app/database/IngredientModel";

export async function GET() {
  const { rows } = await getAllIngredients();

  return NextResponse.json(rows);
}
