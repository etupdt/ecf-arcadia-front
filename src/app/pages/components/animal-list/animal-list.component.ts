import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalFormComponent } from "../animal-form/animal-form.component";
import { AnimalFoodComponent } from '../animal-food/animal-food.component';

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
    ) {}

    @Input() template: string = 'food'

    @Output() selectAnimal: EventEmitter<Animal> = new EventEmitter()
    selectedAnimal: Animal = {
        id: 0,
        firstname: '',
        health: "",
        race: {
            id: 0,
            label: ''
        },
        images: [],
        veterinaryReports: []
    }

    animals$: Observable<Animal[]> = this.animalService.getAnimals()

    new: boolean = false

    addAnimal = () => {
        this.selectedAnimal = {
            id: 0,
            firstname: '',
            health: '',
            race: {
                id: 0,
                label: ''
            },
            images: [],
            veterinaryReports: []
        }
        this.new = true
    }

    clickAnimal = (animal: Animal) => {
        this.selectedAnimal = Object.assign({}, animal)
    }

}
