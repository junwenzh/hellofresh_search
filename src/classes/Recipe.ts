import moment from 'moment';

export default class Recipe {
  id: string;

  name: string;

  category: string | null;

  difficulty: number | null;

  calories: number | null;

  prepTime: number | null;

  totalTime: number | null;

  favoritesCount: number | null;

  ratingsCount: number | null;

  averageRating: number | null;

  ingredients: { name: string }[];

  steps: { index: number; instructions: string }[];

  constructor(
    id: string,
    name: string,
    category: string | null,
    difficulty: number | null,
    nutrition: { name: string; amount: number }[],
    prepTime: string | null,
    totalTime: string | null,
    favoritesCount: number | null,
    ratingsCount: number | null,
    averageRating: number | null,
    ingredients: { name: string }[],
    steps: { index: number; instructions: string }[]
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.difficulty = difficulty;
    this.calories = nutrition[0]?.amount;
    this.prepTime = moment.duration(prepTime).asMinutes();
    this.totalTime = moment.duration(totalTime).asMinutes();
    this.favoritesCount = favoritesCount;
    this.ratingsCount = ratingsCount;
    this.averageRating = averageRating;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
