import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { View } from '../interfaces/View';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(
    private http: HttpClient
  ) { }

  getViews(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/views`
    )

  }

  putView(view: View): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/views/${view.id}`,
      view
    )

  }

  postView(view: View): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/views`,
      view
    )

  }

  deleteView(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/views/${id}`
    )

  }
  
}
