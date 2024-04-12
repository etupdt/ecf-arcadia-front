import { IElement } from "./IElement";

export interface IService extends IElement {
    id: number,
    name: string,
    description: string,
//    images: Image[]
}