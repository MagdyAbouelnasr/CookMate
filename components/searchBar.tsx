"use client";

import { Select, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import React, { useState } from "react";
import { SearchBarProps } from "../lib/types";
import SearchIcon from "./icons/search";

enum SearchType {
  name = "name",
  cuisine = "cuisine",
}

const SearchBar: React.FC<SearchBarProps> = ({ allRecipes }) => {
  const [searchTerm, setSearchTerm] = useDebouncedState<string>("", 200);
  const [selectedType, setSelectedType] = useState<string>(SearchType.name);

  const handleSelectChange = (value: string | null = SearchType.name) => {
    setSelectedType(value || SearchType.name);
  };

  return (
    <div className="mt-4 ml-4 flex items-center">
      <Select
        value={selectedType}
        onChange={handleSelectChange}
        data={[
          { value: SearchType.name, label: "Recipe Name" },
          { value: SearchType.cuisine, label: "Cuisine" },
        ]}
        className="p-2 bg-collection-1-shade-2 rounded-lg mr-2"
      />

      <TextInput
        placeholder="Search for new recipes"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        className="w-full"
      />

      <span className="relative right-7">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
