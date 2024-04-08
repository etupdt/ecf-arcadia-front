import { Animal } from "./Animal";
import { Food } from "./Food";

export interface FoodAnimal {
    id: number,
    dateFood: string,
    gramage: number,
    animal?: Animal,
    food: Food
}
