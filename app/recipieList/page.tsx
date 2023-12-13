"use client";

import { usePagination } from "@mantine/hooks";
import { FC, useState } from "react";
import { SearchBarProps } from "../../lib/types";
import Recipe from "./[recipeId]/page";

const mockResults = [
  {
    id: 1,
    name: "food1",
    description: "delicous food 1",

    ingredients: ["eggs", "flour"],
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Ffreepngimg.com%2Fsave%2F139203-food-plate-top-nutrition-view%2F531x518&tbnid=AK-tfkR53rI2GM&vet=12ahUKEwjKh5bN3ImDAxX6U6QEHRAhD7AQMygJegQIARBi..i&imgrefurl=https%3A%2F%2Ffreepngimg.com%2Fpng%2F139203-food-plate-top-nutrition-view&docid=hg54srrUvuj7gM&w=531&h=518&q=food%20plate%20url%20image&ved=2ahUKEwjKh5bN3ImDAxX6U6QEHRAhD7AQMygJegQIARBi",

    steps: ["crack eggs", "mix eggs", "add floud and mix"],
    cuisine: "italian",

    prepTime: "10 minutes",
    rating: {
      average: 5,
      count: 123,
    },
  },

  {
    id: 1,
    name: "food1",
    description: "delicous food 1",

    ingredients: ["eggs", "flour"],
    image: "/food_example1.jpg",

    steps: ["crack eggs", "mix eggs", "add floud and mix"],
    cuisine: "italian",

    prepTime: "10 minutes",
    rating: {
      average: 5,
      count: 123,
    },
  },

  {
    id: 1,
    name: "food1",
    description: "delicous food 1",

    ingredients: ["eggs", "flour"],
    image: "/food_example1.jpg",

    steps: ["crack eggs", "mix eggs", "add floud and mix"],
    cuisine: "italian",

    prepTime: "10 minutes",
    rating: {
      average: 5,
      count: 123,
    },
  },
];

const ITEMS_PER_PAGE = 12;

const Recipies: FC<SearchBarProps> = ({}) => {
  // const [visibleResults, setVisibleResults] = useState<string[]>(
  //   mockResults.slice(0, ITEMS_PER_PAGE)
  // );

  // const pagination = usePagination({
  //   total: Math.ceil(mockResults.length / ITEMS_PER_PAGE),
  //   initialPage: 1,
  //   onChange(page) {
  //     const start = (page - 1) * ITEMS_PER_PAGE;
  //     const end = start + ITEMS_PER_PAGE;
  //     setVisibleResults(mockResults.slice(start, end));
  //   },
  // });

  return (
    <div className="grid grid-cols-4 max-[750px]:grid-cols-2 gap-4 ">
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
    </div>
  );
};

export default Recipies;

{
  /* <div>
      <ul>
        {visibleResults.map((result, i) => (
          <li key={`result-${i}`}>{result}</li>
        ))}

        <div className="flex gap-4">
          <button onClick={pagination.previous}>prev</button>
          <button onClick={pagination.next}>next</button>
        </div>
      </ul>
    </div> */
}
