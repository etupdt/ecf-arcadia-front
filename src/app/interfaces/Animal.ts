import { IImage } from "./IImage";
import { VeterinaryReport } from "./VeterinaryReport";
import { Race } from "./Race";
import { IHabitat } from "./IHabitat";
import { IFoodAnimal } from "./IFoodAnimal";

export interface Animal {
    id: number,
    firstname: string,
    description: string,
    health: string,
    race?: Race,
    habitat?: IHabitat,
    images?: IImage[],
    veterinaryReports?: VeterinaryReport[]
    foodAnimals?: IFoodAnimal[]
}