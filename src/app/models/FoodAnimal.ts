import { HttpHeaders } from "@angular/common/http";
import { IFoodAnimal } from "../interfaces/IFoodAnimal";
import { Animal } from "./Animal";
import { Food } from "./Food";

export class FoodAnimal implements IFoodAnimal {

    constructor (
        public id: number = 0,
        public dateFood: string = '',
        public gramage: number = 0,
        public animal: Animal = new Animal(),
        public food: Food = new Food()
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