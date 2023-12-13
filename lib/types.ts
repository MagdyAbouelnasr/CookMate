
export interface Recipe {
    id: string;
    name: string;
    description: string;
  
    ingredients: string[];
    image: string;
  
    steps: string[];
    cuisine: string;
  
    prepTime: string;
    rating: {
      average: number;
      count: number;
    };
  }
  
export  interface SearchBarProps {
    allRecipes: Recipe[];
  }