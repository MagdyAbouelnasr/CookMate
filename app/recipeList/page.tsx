"use client"

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Bookmark from "@/components/icons/bookmark";
import { Recipe } from "../../lib/types";
import { Image, TextInput, Pagination } from "@mantine/core";
import { useSession } from "next-auth/react";

const fetchRecipes = async () => {
  try {
    const response = await fetch("/api/recipes");
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data as Recipe[];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

function RecipeList({ searchQuery, selectedFilter }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  // const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    fetchRecipes()
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearchQuery = recipe.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === "" ||
        selectedFilter === "All Recipes" ||
        recipe.cuisine === selectedFilter;
      return matchesSearchQuery && matchesFilter;
    });
  }, [searchQuery, selectedFilter, recipes]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search query changes
  }, [searchQuery]);

  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  const currentRecipes = useMemo(() => {
    const start = (currentPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;
    return filteredRecipes.slice(start, end);
  }, [currentPage, filteredRecipes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentRecipes.length) {
    return <div>No recipes found</div>;
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4">
        {currentRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 rounded-lg text-center relative"
            onClick={() => router.push(`/recipeList/${recipe.id}`)}
          >
            <div className="">
              {recipe.images.length > 0 && (
                <Image
                  src={`${recipe.images[0].data}`} // Display the first image
                  width={300}
                  height={400}
                  alt={`Image for ${recipe.name}`}
                  style={{
                    objectFit: "contain", // Ensure the image is contained within its element
                    objectPosition: "center", // Center the image within its element
                    width: "100%", // Make image take full width of the container
                    height: "100%", // Make image take full height of the container
                  }}
                />
              )}
            </div>
            <div className="bg-collection-1-shade-2">
              <h4>{recipe.name}</h4>
              <div className="flex flex-col items-start">
                <span className="mb-2">Time</span>
                <div className="flex FLEX-ROW justify-between space-x-48">
                  <span className="flex flex-start">
                    {recipe.preparationTime} mins
                  </span>
                  <Bookmark />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-24">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={totalPages}
          color="orange"
          size="md"
          radius="lg"
          className="my-4"
        />
      </div>
    </div>
  );
}

export default RecipeList;
