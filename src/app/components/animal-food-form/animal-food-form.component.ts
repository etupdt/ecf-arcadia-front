import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, Injector, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFoodAnimal } from 'src/app/interfaces/IFoodAnimal';
import { Animal } from 'src/app/models/Animal';
import { Food } from 'src/app/models/Food';
import { FoodAnimal } from 'src/app/models/FoodAnimal';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-food-form',
    templateUrl: './animal-food-form.component.html',
    styleUrls: ['./animal-food-form.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AnimalFoodFormComponent implements OnInit{

    useBackendImages: string = `${environment.useBackendImages}`

    animalFoodForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
        private foodService: ApiService<Food>,
        public datepipe: DatePipe
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            if (this.itemsService.signalIsUpdatedItem()) {
                if (this.itemsService.selectedIndex !== -1) {
                    this.dateFood = this.datepipe.transform(Date.now(), 'y-MM-dd')!
                    this.onChangeDateFood()
                }
            }
        })
    }

    ngOnInit(): void {

        this.itemsService.signalIsUpdated.set(false)

    }

    foods$: Observable<Food[]> = this.foodService.getItems('foods')
    dateFood!: string

    get selectedItem(): Animal { return this.itemsService.items[this.itemsService.selectedIndex]}
    // set selectedItem(item: Animal) {this.itemsService.items[this.itemsService.selectedIndex]}

    foodAnimal!: FoodAnimal
    
    get food() { return this.animalFoodForm.get('food')! as FormControl }
    get gramage() { return this.animalFoodForm.get('gramage')! as FormControl }
    
  
    initForm = () => {
        this.animalFoodForm = new FormGroup({
            food: new FormControl(this.foodAnimal.food.id, Validators.required),
            // gramage: new FormControl(this.itemsService.subSelectedIndex, Validators.required),
            gramage: new FormControl(this.foodAnimal.gramage, Validators.required),
        })
        this.animalFoodForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.foodAnimal.food.id !== this.food.value ||
                this.foodAnimal.gramage !== this.gramage.value 
            )
            this.itemsService.signalIsValid.set(this.animalFoodForm.valid && this.food.value !== 0)
            this.foodAnimal.dateFood = this.foodAnimal.dateFood!
            this.foodAnimal.food.id = this.food.value
            this.foodAnimal.gramage = this.gramage.value
            this.foodAnimal.animal = this.selectedItem
        })
    }

    getFoodAnimal(dateFood: string): number {
        return this.selectedItem.foodAnimals!.findIndex((f: FoodAnimal) => {
            return f.dateFood === dateFood
        })
    }

    onChangeDateFood = () => {

        const indexFoodAnimal = this.getFoodAnimal(this.dateFood)

        this.itemsService.subSelectedIndex = indexFoodAnimal
        
        if (this.itemsService.subSelectedIndex === -1) {
            this.selectedItem.foodAnimals.push(new FoodAnimal(0, this.dateFood, 0, this.selectedItem,  new Food(0, '')))
            this.itemsService.subSelectedIndex = this.selectedItem.foodAnimals.length - 1
        }
        this.foodAnimal = this.selectedItem.foodAnimals[this.itemsService.subSelectedIndex]

        this.initForm()

    }

}