import { Animal } from "./Animal";
import { Food } from "./Food";
import { IElement } from "./IElement";

export interface IFoodAnimal extends IElement {
    id: number,
    dateFood: string,
    gramage: number,
    animal?: Animal,
    food: Food
}
