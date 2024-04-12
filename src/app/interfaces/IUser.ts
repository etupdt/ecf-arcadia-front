import { IElement } from "./IElement";

export interface IUser extends IElement {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    password?: string,
    role: string
}