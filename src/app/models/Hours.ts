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

    static deserialize (data: any, level: number): Hours {
        return new Hours(
            data.id, 
            data.monday,
            data.tuesday,
            data.wednesday,
            data.thursday,
            data.friday,
            data.saturday,
            data.sunday
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