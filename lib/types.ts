
export interface Recipe {
  id: number;
  name: string;
  description: string;
  preparationTime: number;
  ingredients: string[]; // Assuming this is an array of strings stored as JSON
  preparationSteps: string[]; // Assuming this is an array of strings stored as JSON
  images: Image[];
  cuisine: String;
  creatorId: number;
  createdAt: string;
  creator: User;
  // ... other fields like creator, ratings, etc.
}

export interface User {
    id: number;
    email: string;
    username: string;
    active: false;
}

export interface Image {
  id: number;
  data: string; // Assuming 'data' is a URL or a base64 string
  recipeId: number;
}

  
export  interface SearchBarProps {
    allRecipes: Recipe[];
  }