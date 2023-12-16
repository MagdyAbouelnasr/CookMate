import React, { useState } from "react";
import { Select, rem } from "@mantine/core";
import { IconComponents } from "@tabler/icons-react";

const filterOptions = [
  "All Recipes",
  "Arabian",
  "Asian",
  "Italian",
  "Indian",
  "Chinese",
];

export default function FilterBar({ onFilterChange }: any) {
  const icon = <IconComponents style={{ width: rem(16), height: rem(16) }} />;
  const [selectedFilter, setSelectedFilter] = useState("All Recipes");
  const [selectedFilterBy, setSelectedFilterBy] = useState<string | null>(""); // State for the dropdown

  const handleFilterClick = (filter: any) => {
    setSelectedFilter(filter);
    if (typeof onFilterChange === "function") {
      onFilterChange(filter); // Call the parent's callback function
    }
  };

  return (
    <section className="mt-4 p-4">
      <div className="inline-flex items-start gap-[118px] relative">
        <div className="items-start gap-[11px] inline-flex relative flex-[0_0_auto]">
          {filterOptions.map((filter) => (
            <div
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`items-center justify-center gap-[8px] px-[34px] py-[22px] ${
                selectedFilter === filter
                  ? "bg-collection-1-primary text-white"
                  : "bg-collection-1-shade-1 text-black"
              } rounded-[16px] overflow-hidden border border-solid border-[#3636361a] inline-flex relative flex-[0_0_auto]`}
            >
              <div className="relative w-fit mt-[-1.00px] font-semibold text-center tracking-[0] leading-[normal] whitespace-nowrap">
                {filter}
              </div>
            </div>
          ))}
        </div>
        <div id="recentRecipes" className="inline-flex items-center gap-2">
          <Select
            size="xl"
            rightSectionPointerEvents="none"
            leftSection={icon}
            placeholder="Filter By"
            allowDeselect
            mr={"md"}
            data={["Newest", "Most popular", "Highestrated"]}
            clearable
            value={selectedFilterBy}
            onChange={setSelectedFilterBy}
            styles={{
              input: {
                backgroundColor: "black", // Background color of the select input
                color: "white", // Text color
              },
              dropdown: {
                backgroundColor: "black", // Background color of the dropdown menu
                color: "gray", // Text color for the dropdown menu
              },
              // item: {
              //   ":hover": {
              //     outline: "grey", // Background color of items on hover
              //     color: "black", // Text color of items on hover
              //   },
              // },
            }}
          />
        </div>
      </div>
    </section>
  );
}
