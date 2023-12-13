import Image from "next/image";
import SearchBar from "../../components/searchBar";

export default function Hero() {
  return (
    <section className="grid grid-cols-2 max-[600px]:grid-cols-1 py-8 hero p-4">
      <div className="mt-20">
        <h1 className="text-4xl font-semibold">Hello Name</h1>
        <p className="mt-4">What are you cooking today?</p>
        <SearchBar allRecipes={[]} />
      </div>

      <div className="relative">
        <Image
          src={"/food_example1.jpg"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"recipe image"}
          className="max-[600px]:invisible"
        />
      </div>
    </section>
  );
}
