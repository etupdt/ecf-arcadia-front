import { HttpHeaders } from "@angular/common/http";
import { IFood } from "../interfaces/IFood";

export class Food implements IFood {

    constructor (
        public id: number = 0,
        public name: string = '',
    ) {}

    static deserialize (data: any, level: number): Food {
        return new Food(data.id, data.name)
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