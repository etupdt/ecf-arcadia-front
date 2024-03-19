import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../interfaces/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/services`
    )

  }

  putService(service: Service): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/services/${service.id}`,
      service
    )

  }

  postService(service: Service): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/services`,
      service
    )

  }

  deleteService(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/services/${id}`
    )

  }
  
}
