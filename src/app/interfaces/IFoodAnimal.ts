import { Animal } from "../models/Animal";
import { Food } from "../models/Food";
import { IAnimal } from "./IAnimal";
import { IElement } from "./IElement";

export interface IFoodAnimal extends IElement {
    id: number,
    dateFood: string,
    gramage: number,
    animal: IAnimal,
    food: Food
}
