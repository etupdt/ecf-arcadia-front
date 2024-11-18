import { IElement } from "./IElement";

export interface IUser extends IElement {
    id: number,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string
}