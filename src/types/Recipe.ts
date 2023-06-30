export interface Recipe {
  averagerating: number;
  calories: number;
  category: string;
  cuisines: { cuisine: string }[];
  description: string;
  difficulty: number;
  favoritescount: number;
  headline: string;
  id: string;
  imagepath: string;
  ingredients: {
    name: string;
    imagepath: string;
    amount: number;
    unit: string;
  }[];
  name: string;
  preptime: string;
  rn: string;
  steps: { step: number; ingredients: string; instructions: string }[];
  tags: string[];
  totaltime: string;
  websiteurl: string;
}
