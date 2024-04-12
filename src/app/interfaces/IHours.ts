import { IElement } from "./IElement"

export interface IHours extends IElement{
    id: number,
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
}