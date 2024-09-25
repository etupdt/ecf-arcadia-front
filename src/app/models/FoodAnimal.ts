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

    static deserialize (data: any, level: number): FoodAnimal {
        return new FoodAnimal(
            data.id,
            data.dateFood,
            data.gramage,
            level > 0 ? Animal.deserialize(data.animal, level - 1) : new Animal()
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