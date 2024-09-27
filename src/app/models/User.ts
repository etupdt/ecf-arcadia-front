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

    static deserialize (data: any, level: number): User {
        return new User(
            data.id, 
            data.email,
            data.password,
            data.firstname,
            data.lastname,
            data.role
        )
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