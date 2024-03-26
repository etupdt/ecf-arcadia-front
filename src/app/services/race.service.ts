import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Race } from '../interfaces/Race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(
    private http: HttpClient
  ) { }

  getRaces(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/races`
    )

  }

  putRace(race: Race): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/races/${race.id}`,
      race
    )

  }

  postRace(race: Race): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/races`,
      race
    )

  }

  deleteRace(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/races/${id}`
    )

  }
  
}
