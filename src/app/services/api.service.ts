import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IImage } from '../interfaces/IImage';
import { IElement } from '../interfaces/IElement';

@Injectable({
  providedIn: 'root'
})
export class ApiService<Tdata> {

    constructor(
        private http: HttpClient
    ) {}

    getItems(type: string): Observable<Tdata[]> {

        return this.http.get<Tdata[]>(
        environment.useBackend + `/api/${type}`
        )

    }

    getItem(type: string, id: number): Observable<Tdata> {

        return this.http.get<Tdata>(
        environment.useBackend + `/api/${type}/${id}`
        )

    }

    putItem(type: string, id: number, item: IElement): Observable<Tdata> {

        return this.http.put<Tdata>(
        environment.useBackend + `/api/${type}/${id}`,
        item.getApiItemBody()
        )

    }

    postItem(type: string, item: IElement): Observable<Tdata> {

        return this.http.post<any>(
            environment.useBackend + `/api/${type}`,
            item.getApiItemBody()
        )

    }

    deleteItem(type: string, id: number): Observable<Tdata>{

        return this.http.delete<Tdata>(
        environment.useBackend + `/api/${type}/${id}`
        )

    }

}
