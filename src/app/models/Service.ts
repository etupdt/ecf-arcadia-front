import { HttpHeaders } from "@angular/common/http";
import { IService } from "../interfaces/IService";

export class Service implements IService {

    constructor (
        public id: number = 0,
        public name: string= '',
        public description: string = '',
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