import { HttpHeaders } from "@angular/common/http";
import { IBreed } from "../interfaces/IBreed";

export class Breed implements IBreed {

    constructor (
        public id: number = 0,
        public label: string = '',
    ) {}

    clone (level: number): any {
        return new Breed(this.id, this.label)
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