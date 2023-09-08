import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getUserIngredients } from '@/app/database/IngredientModel';

export async function GET(request: Request) {
  const email = cookies().get('email');

  if (!email) {
    return NextResponse.json(
      { message: 'User is not logged in' },
      { status: 204 }
    );
  }

  const { rows } = await getUserIngredients(email.value);

  return NextResponse.json(rows);
}
