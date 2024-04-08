import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { Food } from 'src/app/interfaces/Food';
import { FoodAnimal } from 'src/app/interfaces/FoodAnimal';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-food',
    templateUrl: './animal-food.component.html',
    styleUrls: ['./animal-food.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AnimalFoodComponent {

    useBackendImages: string = `${environment.useBackendImages}`

    animalForm!: FormGroup

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
                console.log(this.itemsService.isUpdatedItem)
                this.onChangeDateFood()
            }
        })
        effect(() => {
            if (this.itemsService.signalSelectedIndex() !== -1) {
                console.log(this.itemsService.isUpdatedItem)
                this.onChangeDateFood()
            }
        })
    }

    dateFood: string | null = this.datepipe.transform(Date.now(), 'y-MM-dd')
    foods$: Observable<Food[]> = this.foodService.getItems('foods')
    
    get selectedItem(): Animal { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Animal) {this.itemsService.items[this.itemsService.selectedIndex]}

    get foodAnimal() { return this.itemsService.updatedItem }
    set foodAnimal(foodAnimal : FoodAnimal) { this.itemsService.updatedItem = foodAnimal }
    
    get food() { return this.animalForm.get('food')! as FormControl }
    get gramage() { return this.animalForm.get('gramage')! as FormControl }
    
    foodAnimalIndex: number = -1
    
    initForm = () => {
        this.animalForm = new FormGroup({
            food: new FormControl(this.foodAnimal.food.id, Validators.required),
            gramage: new FormControl(this.foodAnimal.gramage, Validators.required),
        })
        this.animalForm.valueChanges.subscribe(changes => { 
            console.log(this.animalForm.valid, this.foodAnimal.food.id, this.food.value)
            this.itemsService.signalIsUpdated.set(
                this.foodAnimal.food.id !== this.food.value ||
                this.foodAnimal.gramage !== this.gramage.value 
            )
            this.itemsService.signalIsValid.set(this.animalForm.valid && this.food.value !== 0)
            this.foodAnimal.dateFood = this.dateFood!
            this.foodAnimal.food.id = this.food.value
            this.foodAnimal.gramage = this.gramage.value
        })
    }

    getFoodAnimal(dateFood: string): FoodAnimal | undefined {

        return this.selectedItem.foodAnimals!.find((f: FoodAnimal) => {
            return f.dateFood === dateFood
        })
        
    }

    onChangeDateFood = () => {

        const foodAnimal = this.getFoodAnimal(this.dateFood!)

        if (foodAnimal) {
            this.foodAnimal = {
                id: foodAnimal.id,
                dateFood: foodAnimal.dateFood,
                gramage: foodAnimal.gramage,
                food: foodAnimal.food,
                animal: this.selectedItem
            }
            console.log(this.foodAnimal)
            console.log(this.selectedItem)

        } else {

            this.foodAnimal = {
                id: 0,
                dateFood: this.datepipe.transform(Date.now(), 'y-MM-dd')!,
                gramage: 0,
                food: {
                    id: 0,
                    name: '',
                },
                animal: this.selectedItem
            }

        }

        this.initForm()

    }

}