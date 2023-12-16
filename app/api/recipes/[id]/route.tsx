import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

//Create Recipe

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    // Get the recipe ID from the request parameters
    const id = +params.id;

    // Check if the ID is a valid number
    if (!id || isNaN(Number(id))) {
      throw new Error("Invalid recipe ID");
    }

    // Fetch the recipe by ID
    const result = await prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        creator: true,
      },
    });

    // Check if the recipe was found
    if (!result) {
      throw new Error("Recipe not found");
    }

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, // Bad Request status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}



// # Handling Image future feature to select images // choose recipe based on images a game roulette future feautre idea

// Saving a base64-encoded image to the database
// const base64ImageData = "..."; // Replace with your base64 image data
// await prisma.image.create({
//   data: {
//     data: base64ImageData,
//     caption: "A beautiful sunset",
//   },
// });

// // Retrieving a base64-encoded image from the database
// const image = await prisma.image.findUnique({
//   where: {
//     id: 1, // Replace with the actual ID of the image you want to retrieve
//   },
// });

// const base64ImageDataFromDb = image.data; // The base64-encoded image data
