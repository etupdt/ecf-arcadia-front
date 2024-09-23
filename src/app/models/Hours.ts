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

    clone (level: number): Hours {
        return new Hours(
            this.id, 
            this.monday,
            this.tuesday,
            this.wednesday,
            this.thursday,
            this.friday,
            this.saturday,
            this.sunday
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