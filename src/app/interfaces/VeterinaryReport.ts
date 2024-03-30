import { Animal } from "./Animal";
import { Food } from "./Food";
import { User } from "./User";

export interface VeterinaryReport {
    id: number,
    date: string,
    detail: string,
    gramage: number,
    animal?: Animal,
    user?: User,
    food: Food
}