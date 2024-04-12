import { IImage } from "./IImage";
import { VeterinaryReport } from "./VeterinaryReport";
import { IRace } from "./IRace";
import { IHabitat } from "./IHabitat";
import { IFoodAnimal } from "./IFoodAnimal";

export interface Animal {
    id: number,
    firstname: string,
    description: string,
    health: string,
    race?: IRace,
    habitat?: IHabitat,
    images?: IImage[],
    veterinaryReports?: VeterinaryReport[]
    foodAnimals?: IFoodAnimal[]
}