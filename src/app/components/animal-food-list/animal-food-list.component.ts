import { NgFor } from '@angular/common';
import { Component, Injector, Input, effect } from '@angular/core';
import { Animal } from 'src/app/models/Animal';
import { FoodAnimal } from 'src/app/models/FoodAnimal';

@Component({
  selector: 'app-animal-food-list',
  templateUrl: './animal-food-list.component.html',
  styleUrls: ['./animal-food-list.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class AnimalFoodListComponent {

    @Input() animal!: Animal
    
    get foodAnimals() {return this.animal.foodAnimals.sort((a: FoodAnimal, b: FoodAnimal) => b.dateFood.localeCompare(a.dateFood))}
    
}
