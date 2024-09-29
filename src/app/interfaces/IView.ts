import { IElement } from "./IElement";

export interface IView extends IElement {
    id: number,
    pseudo: string,
    comment: string,
    isVisible: boolean
}