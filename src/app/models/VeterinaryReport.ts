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

    getApiItemBody (): any {

        return this

    }

    getApiItemHeaders (): HttpHeaders {
        
        let headers = new HttpHeaders()
        headers.append('Content-Type','application/json')

        return headers

    }

}