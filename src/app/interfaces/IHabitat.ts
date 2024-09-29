import { Animal } from "../models/Animal";
import { Image } from "../models/Image";
import { IElement } from "./IElement";

export interface IHabitat extends IElement {
    id: number,
    name: string,
    description: string,
    comment: string,
    animals: Animal[],
    images: Image[]
}