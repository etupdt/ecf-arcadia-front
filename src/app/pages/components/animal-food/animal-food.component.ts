import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { Food } from 'src/app/interfaces/Food';
import { FoodAnimal } from 'src/app/interfaces/FoodAnimal';
import { FoodAnimalService } from 'src/app/services/food-animal.service';
import { FoodService } from 'src/app/services/food.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-food',
    templateUrl: './animal-food.component.html',
    styleUrls: ['./animal-food.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AnimalFoodComponent {

    constructor (
        private foodService: FoodService,
        private foodAnimalService: FoodAnimalService,
        public datepipe: DatePipe
    ) {}

    @Input() animal!: Animal
    @Output() animalUpdated: EventEmitter<FoodAnimal[]> = new EventEmitter();
    
    dateFood: string | null = this.datepipe.transform(Date.now(), 'y-MM-dd')
    foodAnimalIndex: number = -1

    foods$: Observable<Food[]> = this.foodService.getFoods()

    useBackendImages: string = `${environment.useBackendImages}`

    animalForm!: FormGroup

    updated: boolean = false

    ngOnInit(): void {
        this.initForm()
    }        

    ngOnChanges(changes: SimpleChanges) {
        this.initForm()
    }
    
    initForm = () => {
        this.animalForm = new FormGroup({
            food: new FormControl(this.foodAnimal?.food.id, Validators.required),
            gramage: new FormControl(this.foodAnimal?.gramage, Validators.required),
        })
        this.animalForm.valueChanges.subscribe(change => {
                this.updated = this.isUpdated()
        })        
    }

    update = () => {

        if (this.foodAnimalIndex === -1) {
            const foodAnimal = {
                id: 0,
                dateFood: this.dateFood,
                food: {
                    id: this.food.value
                },
                animal: this.animal,
                gramage: this.gramage.value
            }            
            this.foodAnimalService.postFoodAnimal(foodAnimal as FoodAnimal).subscribe({
                next: (res: FoodAnimal) => {
                    this.updated = false
                    this.animal.foodAnimals!.push(res)
                    this.animalUpdated.emit(this.animal.foodAnimals)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        } else {

            this.animal.foodAnimals![this.foodAnimalIndex].dateFood = this.dateFood!
            this.animal.foodAnimals![this.foodAnimalIndex].food = {id: this.food.value}
            this.animal.foodAnimals![this.foodAnimalIndex].gramage = this.gramage.value!

            this.foodAnimalService.putFoodAnimal(this.animal.foodAnimals![this.foodAnimalIndex]).subscribe({
                next: (res: FoodAnimal) => {
                    this.updated = false
                    this.animalUpdated.emit(this.animal.foodAnimals)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        }

    }

    isUpdated = () => {
        return this.foodAnimal?.food !== this.food.value ||
            this.foodAnimal?.gramage !== this.gramage.value
    }

    get food() { return this.animalForm.get('food')! as FormControl }
    get gramage() { return this.animalForm.get('gramage')! as FormControl }

    get foodAnimal() {
        this.foodAnimalIndex = this.animal.foodAnimals!.findIndex(f => f.dateFood === this.dateFood)
        return this.animal.foodAnimals![this.foodAnimalIndex] 
    }

}
