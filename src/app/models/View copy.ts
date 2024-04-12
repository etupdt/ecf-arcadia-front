import { HttpHeaders } from "@angular/common/http";
import { Animal } from "../interfaces/Animal";
import { IHabitat } from "../interfaces/IHabitat";
import { Md5 } from 'ts-md5';
import { IImage } from "../interfaces/IImage";
import { Image } from "./Image";
import { IView } from "../interfaces/IView";

export class View implements IView {

    constructor (
        public id: number,
        public pseudo: string,
        public comment: string,
        public isVisible: boolean
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