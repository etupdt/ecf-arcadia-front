import { HttpHeaders } from "@angular/common/http";

export class AnimalStatistic {

    constructor (
        public firstname: string = '',
        public date: string = '',
        public qty: number = 1,
    ) {}

    clone (level: number) {
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