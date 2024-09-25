import { HttpHeaders } from "@angular/common/http";
import { IContact } from "../interfaces/IContact";

export class Contact implements IContact{

    constructor (
        public title: string = '',
        public description: string = '',
        public email: string = '',
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