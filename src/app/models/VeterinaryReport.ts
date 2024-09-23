import { HttpHeaders } from "@angular/common/http";
import { IVeterinaryReport } from "../interfaces/IVeterinaryReport";
import { Animal } from "./Animal";
import { Food } from "./Food";
import { User } from "./User";
import { IAnimal } from "../interfaces/IAnimal";

export class VeterinaryReport implements IVeterinaryReport {

    constructor (
        public id: number = 0,
        public date: string = '',
        public detail: string = '',
        public gramage: number = 0,
        public animal: IAnimal = new Animal(),
        public user: User = new User(),
        public food: Food = new Food(),
    ) {}

    clone (level: number): VeterinaryReport {
        return new VeterinaryReport(
            this.id,
            this.date,
            this.detail,
            this.gramage,
            level > 0 ? this.animal.clone(level - 1) : new Animal(this.animal.id),
            level > 0 ? this.user.clone(level - 1) : new User(this.user.id),
            level > 0 ? this.food.clone(level - 1) : new Food(this.user.id)
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