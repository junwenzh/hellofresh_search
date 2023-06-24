export type Item = {
  averageRating: number;
  category: { name: string };
  difficulty: number;
  favoritesCount: number;
  id: string;
  ingredients: { name: string }[];
  name: string;
  nutrition: { name: string; amount: number }[];
  prepTime: string;
  ratingsCount: number;
  totalTime: string;
  // steps: {index: number, instructions: string}[],
};

export type ResponseBody = {
  items: Item[];
  take: number;
  skip: number;
  count: number;
  total: number;
};
