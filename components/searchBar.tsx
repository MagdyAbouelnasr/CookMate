"use client";

import { Select, TextInput } from "@mantine/core";
import React, { useState } from "react";
import SearchIcon from "./icons/search";

enum SearchType {
  name = "name",
  cuisine = "cuisine",
}

const SearchBar = ({ setSearchQuery }: any) => {
  const [selectedType, setSelectedType] = useState<string>(SearchType.name);

  const handleSelectChange = (value: string | null = SearchType.name) => {
    setSelectedType(value || SearchType.name);
  };

  return (
    <div className="mt-4 ml-4 flex items-center w-4/12">
      <Select
        rightSectionPointerEvents="none"
        value={selectedType}
        onChange={handleSelectChange}
        data={[
          { value: SearchType.name, label: "Recipe Name" },
        ]}
        size="sm"
        styles={{
          input: {
            backgroundColor: "rgba(253, 238, 217, 1)",
          },

          dropdown: {
            backgroundColor: "rgba(253, 238, 217, 1)",
          },
        }}
      />

      <TextInput
        placeholder="Search for new recipes"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      <span className="relative right-7">
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchBar;
