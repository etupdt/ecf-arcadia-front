import { Animal } from "../models/Animal";
import { Food } from "../models/Food";
import { User } from "../models/User";
import { IAnimal } from "./IAnimal";
import { IElement } from "./IElement";

export interface IVeterinaryReport extends IElement {
    id: number,
    date: string,
    detail: string,
    gramage: number,
    animal: IAnimal,
    user: User,
    food: Food
}