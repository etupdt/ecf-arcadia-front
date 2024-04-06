import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService<Tdata> {

    constructor(
        private http: HttpClient
    ) {}

    selectedItem!: Tdata | null
    signalSelectedItem = signal(this.selectedItem)

    signalIsUpdated = signal(false)
    signalIsValid = signal(false)

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

    putItem(type: string, id: number, item: Tdata): Observable<Tdata> {

        return this.http.put<Tdata>(
        environment.useBackend + `/api/${type}/${id}`,
        item
        )

    }

    postItem(type: string, item: Tdata): Observable<Tdata> {

        return this.http.post<Tdata>(
        environment.useBackend + `/api/${type}`,
        item
        )

    }

    deleteItem(type: string, id: number): Observable<Tdata>{

        return this.http.delete<Tdata>(
        environment.useBackend + `/api/${type}/${id}`
        )

    }
    
}
