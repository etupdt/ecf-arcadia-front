import { HttpHeaders } from "@angular/common/http";

export class Contact implements Contact {

    constructor (
        public title: string = '',
        public description: string = '',
        public email: string = '',
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