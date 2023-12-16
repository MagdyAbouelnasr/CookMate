"use client";

import SearchBar from "@/components/searchBar";
import FilterBar from "../../components/filterBar";
import Hero from "../hero/page";
import RecipeList from "../recipeList/page";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (filterValue: any) => {
    setSelectedFilter(filterValue);
  };

  return (
    <>
      <div className="relative">
        <Hero />
        <div className="absolute top-52 w-full" style={{ zIndex: 10 }}>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
      </div>
      <FilterBar onFilterChange={handleFilterChange} />

      <RecipeList searchQuery={searchQuery} selectedFilter={selectedFilter} />
    </>
  );
}
