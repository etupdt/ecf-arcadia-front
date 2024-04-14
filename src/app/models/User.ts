import { HttpHeaders } from "@angular/common/http";
import { IUser } from "../interfaces/IUser";

export class User implements IUser {

    constructor (
        public id: number = 0,
        public email: string = '',
        public password: string = '',
        public firstname: string = '',
        public lastname: string = '',
        public role: string = '',
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