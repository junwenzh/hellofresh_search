import moment from 'moment';

export default class Recipe {
  id: string;

  name: string;

  category: string;

  difficulty: number;

  calories: number;

  prepTime: number;

  totalTime: number;

  favoritesCount: number;

  ratingsCount: number;

  averageRating: number;

  ingredients: { name: string }[];

  steps: { index: number; instructions: string }[];

  constructor(
    id: string,
    name: string,
    category: string,
    difficulty: number,
    nutrition: number,
    prepTime: string,
    totalTime: string,
    favoritesCount: number,
    ratingsCount: number,
    averageRating: number,
    ingredients: { name: string }[],
    steps: { index: number; instructions: string }[]
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.difficulty = difficulty;
    this.calories = nutrition;
    this.prepTime = moment.duration(prepTime).asMinutes();
    this.totalTime = moment.duration(totalTime).asMinutes();
    this.favoritesCount = favoritesCount;
    this.ratingsCount = ratingsCount;
    this.averageRating = averageRating;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}
