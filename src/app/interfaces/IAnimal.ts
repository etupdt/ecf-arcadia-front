
import { IElement } from "./IElement";
import { Breed } from "../models/Breed";
import { Image } from "../models/Image";
import { Habitat } from "../models/Habitat";
import { FoodAnimal } from "../models/FoodAnimal";
import { VeterinaryReport } from "../models/VeterinaryReport";
import { Animal } from "../models/Animal";

export interface IAnimal extends IElement {

    id: number,
    firstname: string,
    description: string,
    health: string,
    breed: Breed,
    habitat: Habitat,
    images: Image[],
    veterinaryReports: VeterinaryReport[]
    foodAnimals: FoodAnimal[]

    clone(level: number): Animal;

}