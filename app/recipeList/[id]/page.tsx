"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Recipe } from "../../../lib/types";
import { Image } from "@mantine/core";
import { format, parseISO } from "date-fns";

const getRecipeDetails = async (id: number) => {
  try {
    const response = await fetch(`/api/recipes/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data as Recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

function RecipeDetail({ params: { id } }: { params: { id: number } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    if (id) {
      getRecipeDetails(+id)
        .then((data) => {
          setRecipe(data);
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-end text-4xl font-bold my-4">
        <div className="flex justify-end items-center">
          <span className="ml-24">Loading...</span>
          <Image
            src="/cook.jpg"
            alt="Chars"
            width={921}
            height={619}
            className=""
          />
        </div>
      </div>
    ); // Display loading message
  }

  if (!recipe) {
    return (
      <div className="flex justify-end text-4xl font-bold my-4">
        <div className="flex justify-end items-center">
          <span className="ml-24">No recipe found</span>
          <Image
            src="/cook.jpg"
            alt="Chars"
            width={921}
            height={619}
            className=""
          />
        </div>
      </div>
    ); // Display message when no recipe is found
  }
  const renderImages = () => {
    const images = recipe.images.map((img, index) => (
      <div
        key={index}
        className="flex justify-center items-center h-64 w-full relative mt-4"
      >
        <Image
          src={`${img.data}`}
          alt={`${recipe.name} - image ${index + 1}`}
          style={{
            objectFit: "contain", // Ensure the image is contained within its element
            objectPosition: "center", // Center the image within its element
            width: "100%", // Make image take full width of the container
            height: "100%", // Make image take full height of the container
          }}
        />
      </div>
    ));

    if (images.length === 1) {
      return <div className="w-full">{images}</div>;
    } else if (images.length === 2) {
      return <div className="flex w-full">{images}</div>;
    } else {
      return (
        <div className="flex w-full">
          <div className="w-1/2">{images[0]}</div>
          <div className="w-1/2 grid grid-cols-1 gap-4">
            {images.slice(1).map((image, index) => (
              <div key={index} className="h-40 w-full relative">
                {image}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <section className="mb-36 mt-36">{renderImages()}</section>

      <h1 className="text-4xl font-bold my-4">{recipe?.name}</h1>
      <div className="mb-6 flex">
        <h2 className=" font-semibold mb-3 mr-12 rounded-full p-4 bg-collection-1-shade-BG">
          {recipe?.creator.username}
        </h2>
        <p className=" font-semibold rounded-full p-4 h-14 bg-collection-1-shade-BG">
          {format(parseISO(recipe?.createdAt), 'LLLL d, yyyy')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold mb-3">Description</h2>
            <p className="text-lg">{recipe?.description}</p>
          </div>

          <div className="">
            <h2 className="text-3xl font-semibold mb-3 mb-2 rounded p-4 bg-collection-1-shade-BG w-7/12">
              Making Steps
            </h2>
            {recipe?.preparationSteps.map((step, index) => (
              <p key={index} className="mb-4 text-lg flex flex-col">
                <strong className="mb-2">Step {index + 1}</strong>
                <span className="mb-4"> {step}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-start items-start">
          <div className=" ml-24 outline-dashed outline-gray-400 rounded w-8/12 p-6 ingredients-section">
            <h2 className="text-3xl font-semibold mb-8">Ingredients</h2>
            <ul className=" text-lg">
              {recipe?.ingredients.map((ingredient, index) => (
                <ul
                  key={index}
                  className="mb-2 rounded p-4 bg-collection-1-shade-BG"
                >
                  {ingredient}
                </ul>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
