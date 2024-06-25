import { HttpHeaders } from "@angular/common/http";
import { IHours } from "../interfaces/IHours";

export class Hours implements IHours {

    constructor (
        public id: number = 0,
        public monday: string = '',
        public tuesday: string = '',
        public wednesday: string = '',
        public thursday: string = '',
        public friday: string = '',
        public saturday: string = '',
        public sunday: string = '',
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