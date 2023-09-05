// authenticate the secret
// get email from cookie
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { findUser } from "@/app/database/UserModel";

export async function POST(request: NextRequest) {
  const cookie = cookies().get("email");
  const { secret } = await request.json();

  if (!cookie || !secret) {
    return NextResponse.json(
      { message: "Invalid email and/or secret" },
      { status: 400 }
    );
  }

  const email = cookie.value;
  const user = await findUser(email);

  if (!user.rowCount) {
    return NextResponse.json({ message: "Email not found" }, { status: 400 });
  }

  try {
    const token = user.rows[0].token;
    jwt.verify(token, secret);
    cookies().set("token", token);
    return NextResponse.json({ message: "Successfully authenticated" });
  } catch (e) {
    return NextResponse.json(
      { message: "Invalid access token" },
      { status: 400 }
    );
  }
}
