"use client"
import React, { useState } from 'react';

const filterOptions = ['All Recipes', 'Arabian', 'Asian', 'Italian', 'Indian', 'Chinese'];


export default function FilterBar() {
  const [selectedFilter, setSelectedFilter] = useState('All Recipes');

  const handleFilterClick = (filter: any) => {
    // Handle the filter click event, for example, updating the state
    setSelectedFilter(filter);
    // You can also perform other actions based on the selected filter
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
                  ? 'bg-collection-1-primary text-white'
                  : 'bg-collection-1-shade-1 text-black'
              } rounded-[16px] overflow-hidden border border-solid border-[#3636361a] inline-flex relative flex-[0_0_auto]`}
            >
              <div className={`relative w-fit mt-[-1.00px] font-semibold text-center tracking-[0] leading-[normal] whitespace-nowrap`}>
                {filter}
              </div>
            </div>
          ))}
        </div>
        <div className="h-[55px] items-center justify-center gap-[8px] px-[34px] py-[22px] bg-collection-1-shade-3 rounded-[16px] overflow-hidden border border-solid border-collection-1-stroke inline-flex relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-semibold text-collection-1-shade-BG text-[16px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Filter By
          </div>
        </div>
      </div>
    </section>
  );
}
