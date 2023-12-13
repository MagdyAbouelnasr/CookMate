"use client"

import { useSession } from "next-auth/react";
import FilterBar from "../../components/filterBar";
import Hero from "../hero/page";
import Recipies from "../recipieList/page";

export default function Home() {
  return (
    <>
      <Hero />

      <FilterBar />

      <Recipies allRecipes={[]} />
    </>
  );
}
