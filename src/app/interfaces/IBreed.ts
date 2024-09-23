import { Breed } from "../models/Breed";
import { IElement } from "./IElement";

export interface IBreed extends IElement {
    id: number,
    label: string,

    clone(level: number): Breed;

}