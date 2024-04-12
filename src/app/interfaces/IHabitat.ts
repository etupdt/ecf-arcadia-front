import { Animal } from "./Animal";
import { IElement } from "./IElement";
import { IImage } from "./IImage";

export interface IHabitat extends IElement {
    id: number,
    name: string,
    description: string,
    comment: string,
    animals: Animal[],
    images: IImage[]
}