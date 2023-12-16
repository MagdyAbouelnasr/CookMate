import prisma from "./../../../lib/prisma";
import { Cuisine } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const result = await prisma.recipe.findMany({
      include: {
        images: true,
      },
    });
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(null));
  }
}

// pages/api/recipes/index.js

interface RequestBody {
  recipeName: string;
  recipeDescription: string;
  recipeTime: number;
  recipeCuisine: string;
  recipeIngredients: string[];
  recipeSteps: string[]; // Assuming these are just an array of strings
  recipeImages: string[];
  userId: number;
}

function getCuisineEnumValue(cuisine: string): Cuisine | undefined {
    const cuisineValue = Cuisine[cuisine as keyof typeof Cuisine];
    return cuisineValue;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

     // Validate and get the correct Cuisine enum value
    const cuisineEnumValue = getCuisineEnumValue(body.recipeCuisine);
    if (!cuisineEnumValue) {
        throw new Error('Invalid cuisine value');
    }

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        name: body.recipeName,
        description: body.recipeDescription,
        preparationTime: +body.recipeTime,
        ingredients: body.recipeIngredients, // Assuming these are just an array of strings
        preparationSteps: body.recipeSteps, // Assuming these are just an array of strings
        cuisine: cuisineEnumValue,
        images: {
          create: body.recipeImages.map((imageData) => ({
            data: imageData,
          })),
        },
        creatorId: +body.userId,
      },
    });

    return new Response(JSON.stringify(newRecipe), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error creating recipe:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, // Bad Request status code
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
