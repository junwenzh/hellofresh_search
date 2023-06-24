export default class Recipe {
  constructor(
    public name: string,
    public imagePath: string,
    public websiteUrl: string,
    public headline: string,
    public description: string,
    public category: string,
    public cuisines: string[],
    public tags: string[],
    public difficulty: number,
    public calories: number,
    public prepTime: number,
    public totalTime: number,
    public ingredients: {
      name: string;
      imagePath: string;
      amount: number;
      unit: string;
    }[],
    public steps: { step: number; ingredients: string; instructions: string }[]
  ) {}
}
