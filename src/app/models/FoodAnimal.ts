import { HttpHeaders } from "@angular/common/http";
import { IFoodAnimal } from "../interfaces/IFoodAnimal";
import { Animal } from "./Animal";
import { Food } from "./Food";
import { IAnimal } from "../interfaces/IAnimal";

export class FoodAnimal implements IFoodAnimal {

    constructor (
        public id: number = 0,
        public dateFood: string = '',
        public gramage: number = 0,
        public animal: IAnimal = new Animal(),
        public food: Food = new Food()
    ) {}

    clone (level: number): FoodAnimal {
        return new FoodAnimal(
            this.id, 
            this.dateFood,
            this.gramage,
            level > 0 ? this.animal.clone(level - 1) : new Animal()
        )
    }

    getApiItemBody (): any {

        return this

    }

    getApiItemHeaders (): HttpHeaders {
        
        let headers = new HttpHeaders()
        headers.append('Content-Type','application/json')

        return headers

    }

}