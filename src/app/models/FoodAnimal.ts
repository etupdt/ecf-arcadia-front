import { HttpHeaders } from "@angular/common/http";
import { Animal } from "../interfaces/Animal";
import { IHabitat } from "../interfaces/IHabitat";
import { IImage } from "../interfaces/IImage";
import { Md5 } from 'ts-md5';
import { IFoodAnimal } from "../interfaces/IFoodAnimal";
import { Food } from "../interfaces/Food";

export class FoodAnimal implements IFoodAnimal {

    constructor (
        public id: number,
        public dateFood: string,
        public gramage: number,
        public animal: Animal,
        public food: Food
    ) {}

    getApiItemBody (): any {

        return this

    }

    getApiItemHeaders (): HttpHeaders {
        
        let headers = new HttpHeaders()
        headers.append('Content-Type','application/json')

        return headers

    }

}