import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Food } from '../interfaces/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http: HttpClient
  ) { }

  getFoods(): Observable<any> {

    return this.http.get(
      environment.useBackend + `/api/foods`
    )

  }

  putFood(food: Food): Observable<any> {

    return this.http.put(
      environment.useBackend + `/api/foods/${food.id}`,
      food
    )

  }

  postFood(food: Food): Observable<any> {

    return this.http.post(
      environment.useBackend + `/api/foods`,
      food
    )

  }

  deleteFood(id: number): Observable<any>{

    return this.http.delete(
      environment.useBackend + `/api/foods/${id}`
    )

  }
  
}
