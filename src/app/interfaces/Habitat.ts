import { Animal } from "./Animal";
import { IImage } from "./Image";

export interface Habitat {
    id: number,
    name: string,
    description: string,
    comment: string,
    animals: Animal[],
    images: IImage[]
}