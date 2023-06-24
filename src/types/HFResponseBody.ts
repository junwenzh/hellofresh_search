export type Item = {
  id: string;
  name: string;
  websiteUrl: string;
  imagePath: string;
  headline: string;
  description: string;
  category: { name: string };
  cuisines: { name: string }[];
  difficulty: number;
  nutrition: { name: string; amount: number; unit: string }[];
  prepTime: string;
  totalTime: string;
  favoritesCount: number;
  ratingsCount: number;
  averageRating: number;
  ingredients: {
    id: string;
    name: string;
    imagePath: string;
    family: { id: string; name: string };
  }[];
  yields: {
    yields: number;
    ingredients: { id: string; amount: number; unit: string }[];
  }[];
  steps: { index: number; ingredients: string[]; instructions: string }[];
  tags: { name: string }[];
};

export type ResponseBody = {
  items: Item[];
  take: number;
  skip: number;
  count: number;
  total: number;
};
