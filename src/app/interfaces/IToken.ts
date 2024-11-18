import { IElement } from "./IElement";

export interface IToken extends IElement {
    access_token: string,
    refresh_token: string
}