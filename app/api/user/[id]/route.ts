import prisma from "./../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // Fetch user data by ID
  const userData = await prisma.user.findUnique({
    where: { id: +params.id },
    // Include additional fields as needed
    select: {
      id: true,
      username: true,
      email: true,
      // Add other fields you want to include in the response
    },
  });

  if (!userData) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// export async function GET(
//   request: Request,
//   { params }: { params: { id: number } }
// ) {
//   const userRecipe = await prisma.recipe.findMany({
//     where: { users: +params.id },
//     include: {
//         users:{
//             email: true,
//             name: true
//         }
//     }
//   });
//   return new Response(JSON.stringify(userRecipe));
// }

// // get all recipies created by specific user for editing / future implementation / feature // update models
