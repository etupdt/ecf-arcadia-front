import { HttpHeaders } from "@angular/common/http";
import { IVeterinaryReport } from "../interfaces/IVeterinaryReport";
import { Animal } from "./Animal";
import { Food } from "./Food";
import { User } from "./User";

export class VeterinaryReport implements IVeterinaryReport {

    constructor (
        public id: number = 0,
        public date: string = '',
        public detail: string = '',
        public gramage: number = 0,
        public animal: Animal = new Animal(),
        public user: User = new User(),
        public food: Food = new Food(),
    ) {}

    static deserialize (data: any, level: number): VeterinaryReport {
        return new VeterinaryReport(
            data.id,
            data.date,
            data.detail,
            data.gramage,
            level > 0 ? Animal.deserialize(data.animal, level - 1) : new Animal(),
            level > 0 ? User.deserialize(data.user, level - 1) : new User(),
            level > 0 ? Food.deserialize(data.food, level - 1) : new Food()
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