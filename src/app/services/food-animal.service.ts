import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodAnimal } from '../interfaces/FoodAnimal';

@Injectable({
  providedIn: 'root'
})
export class FoodAnimalService {

    constructor(
        private http: HttpClient
    ) { }

    getFoodAnimals(): Observable<any> {

        return this.http.get(
        environment.useBackend + `/api/foodanimals`
        )

    }

    putFoodAnimal(foodAnimal: FoodAnimal): Observable<any> {

        return this.http.put(
        environment.useBackend + `/api/foodanimals/${foodAnimal.id}`,
        foodAnimal
        )

    }

    postFoodAnimal(foodAnimal: FoodAnimal): Observable<any> {

        return this.http.post(
        environment.useBackend + `/api/foodanimals`,
        foodAnimal
        )

    }

    deleteFoodAnimal(id: number): Observable<any>{

        return this.http.delete(
        environment.useBackend + `/api/foodanimals/${id}`
        )

    }
}
