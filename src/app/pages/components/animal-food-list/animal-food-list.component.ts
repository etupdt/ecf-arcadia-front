import { NgFor } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodAnimal } from 'src/app/interfaces/FoodAnimal';

@Component({
  selector: 'app-animal-food-list',
  templateUrl: './animal-food-list.component.html',
  styleUrls: ['./animal-food-list.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class AnimalFoodListComponent {

    itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            this.selectedIndex = this.itemsService.signalSelectedIndex()
        })
    }

    selectedIndex: number = -1

    get foodAnimals(): FoodAnimal[] {
        return this.selectedIndex === -1 
            ? []
            : this.itemsService.items[this.selectedIndex].foodAnimals
        }

}
