import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habitat } from '../interfaces/Habitat';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {

  constructor(
    private http: HttpClient
  ) { }

  getHabitats(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/habitats`
    )

  }

  putHabitat(habitat: Habitat): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/habitats/${habitat.id}`,
      habitat
    )

  }

  postHabitat(habitat: Habitat): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/habitats`,
      habitat
    )

  }

  deleteHabitat(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/habitats/${id}`
    )

  }
  
}
