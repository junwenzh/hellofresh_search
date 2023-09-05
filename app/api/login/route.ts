// check if email is in the database
// if yes, update token
// if no, insert email with token
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import sendEmail from "@/app/libs/send_email";
import {
  findUser,
  insertLoginToken,
  updateLoginToken,
} from "@/app/database/UserModel";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (typeof email !== "string" || email.match(/.+@.+\..+/) === null) {
    return NextResponse.json(
      { message: "Invalid email input" },
      { status: 400 }
    );
  }

  const secret = Math.floor(
    Math.random() * (999999 - 100000) + 10000
  ).toString();

  const token = jwt.sign({ email: email }, secret, {
    algorithm: "HS256",
    expiresIn: 600,
  });

  const user = await findUser(email);

  if (user.rowCount) {
    updateLoginToken(email, token);
  } else {
    insertLoginToken(email, token);
  }

  try {
    await sendEmail(email, secret);
    return NextResponse.json({ message: "Emailed access code" });
  } catch {
    console.log("Error sending email");
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
