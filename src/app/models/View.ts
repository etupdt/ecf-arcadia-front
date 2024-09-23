import { HttpHeaders } from "@angular/common/http";
import { IView } from "../interfaces/IView";

export class View implements IView {

    constructor (
        public id: number = 0,
        public pseudo: string = '',
        public comment: string = '',
        public isVisible: boolean = false
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