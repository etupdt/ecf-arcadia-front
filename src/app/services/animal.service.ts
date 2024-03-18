import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../interfaces/Animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(
    private http: HttpClient
  ) { }

  getAnimals(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/animals`
    )

  }

  putAnimal(animal: Animal): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/animals/${animal.id}`,
      animal
    )

  }

  postAnimal(animal: Animal): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/animals`,
      animal
    )

  }

  deleteAnimal(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/animals/${id}`
    )

  }
  
}
