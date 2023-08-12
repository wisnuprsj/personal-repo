import { Ingredient } from '../shared/model/ingredient.model';

export class Recipe {
  //   public name: string;
  //   public description: string;
  //   public imagePath: string;

  //   constructor(name: string, desc: string, imagePath: string) {
  //     this.name = name;
  //     this.description = desc;
  //     this.imagePath = imagePath;
  //   }

  constructor(
    public name: string,
    public desc: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}
}
