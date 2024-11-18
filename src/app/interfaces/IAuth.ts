import { IElement } from "./IElement";

export interface IAuth extends IElement {
    email: string,
    password: string
}