import { Animal } from "./Animal";
import { IImage } from "./IImage";

export interface Habitat {
    id: number,
    name: string,
    description: string,
    comment: string,
    animals: Animal[],
    images: IImage[]
}