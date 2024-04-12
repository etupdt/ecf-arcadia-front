import { HttpHeaders } from "@angular/common/http";
import { IRace } from "../interfaces/IRace";

export class Race implements IRace {

    constructor (
        public id: number = 0,
        public label: string = '',
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