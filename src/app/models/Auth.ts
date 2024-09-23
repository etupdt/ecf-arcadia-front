import { HttpHeaders } from "@angular/common/http";
import { IAuth } from "../interfaces/IAuth";

export class Auth implements IAuth {

    constructor (
        public email: string = '',
        public password: string = '',
    ) {}

    clone (level: number ) {
        return null    
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