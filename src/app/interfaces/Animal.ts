import { FoodAnimal } from "./FoodAnimal";
import { Habitat } from "./Habitat";
import { IImage } from "./IImage";
import { VeterinaryReport } from "./VeterinaryReport";
import { Race } from "./Race";

export interface Animal {
    id: number,
    firstname: string,
    health: string,
    race?: Race,
    habitat?: Habitat,
    images?: IImage[],
    veterinaryReports?: VeterinaryReport[]
    foodAnimals?: FoodAnimal[]
}