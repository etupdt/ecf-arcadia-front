import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(
        private http: HttpClient
    ) {}
        
    getImage(url: string): Observable<Blob> {
        return this.http.get<Blob>(
            url, { observe: 'body', responseType: 'blob' as 'json' }
        )

    }

    blobToBase64 = (blob: Blob) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                resolve(reader.result as string)
            }
            reader.readAsDataURL(blob)
        })

    }

}
