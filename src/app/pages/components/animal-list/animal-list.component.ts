import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalFormComponent } from "../animal-form/animal-form.component";
import { AnimalFoodComponent } from '../animal-food/animal-food.component';
import { FoodAnimal } from 'src/app/interfaces/FoodAnimal';

@Component({
    selector: 'app-animal-list',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, AnimalFormComponent, AnimalFoodComponent]
})
export class AnimalListComponent {

    constructor (
        private animalService: AnimalService,
    ) {
        this.animals$.subscribe(animals => this.selectedAnimal = animals[0])
    }

    @Input() template: string = 'food'
    
    selectedAnimal: Animal = {
        id: 0,
        firstname: '',
        health: "",
        race: {
            id: 0,
            label: ''
        },
        images: [],
        veterinaryReports: [],
        foodAnimals: []
    }

    animals$: Observable<Animal[]> = this.animalService.getAnimals()

    onAnimalUpdate = (foodAnimals: FoodAnimal[]) => {
        this.selectedAnimal.foodAnimals = foodAnimals
    }

}    

