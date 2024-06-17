import { HttpHeaders } from "@angular/common/http";
import { IRace } from "../interfaces/IRace";
import { IHours } from "../interfaces/IHours";
import { IAuth } from "../interfaces/IAuth";

export class Auth implements IAuth {

    constructor (
        public email: string = '',
        public password: string = '',
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