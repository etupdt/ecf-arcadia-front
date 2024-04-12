
import { IElement } from "./IElement";
import { Race } from "../models/Race";
import { Image } from "../models/Image";
import { Habitat } from "../models/Habitat";
import { FoodAnimal } from "../models/FoodAnimal";
import { VeterinaryReport } from "../models/VeterinaryReport";

export interface IAnimal extends IElement {
    id: number,
    firstname: string,
    description: string,
    health: string,
    race: Race,
    habitat: Habitat,
    images: Image[],
    veterinaryReports: VeterinaryReport[]
    foodAnimals: FoodAnimal[]
}