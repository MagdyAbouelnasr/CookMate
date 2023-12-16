import prisma from "./../../../lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  // Check if the email already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (existingUser) {
    // If a user with this email already exists, return an error response
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 400, // Bad Request
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // If the email does not exist, proceed to create the user
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}




export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;


    // Update the user's password
    await prisma.user.update({
      where: { email },
      data: { password: await bcrypt.hash(newPassword, 10) },
    });

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error updating password:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}