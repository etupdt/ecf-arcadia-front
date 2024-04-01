import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Animal } from 'src/app/interfaces/Animal';
import { FoodAnimal } from 'src/app/interfaces/FoodAnimal';
import { AnimalService } from 'src/app/services/animal.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-food',
    templateUrl: './animal-food.component.html',
    styleUrls: ['./animal-food.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ]
})
export class AnimalFoodComponent {

    @Input() animal!: Animal
    @Input() updatable: Boolean = false

    @Output() updateanimalList: EventEmitter<number> = new EventEmitter()
    
    constructor (
        private animalService: AnimalService
    ) {}

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
            dateFood: new FormControl(this.foodAnimal?.dateFood, Validators.required),
            food: new FormControl(this.foodAnimal?.food.name, Validators.required),
            gramage: new FormControl(this.foodAnimal?.gramage, Validators.required),
        });    
        if (!this.updatable) {
            this.dateFood.disable()
            this.food.disable()
            this.gramage.disable()
        }
        this.animalForm.valueChanges.subscribe(change => {
            this.updated = this.isUpdated()
        })        
    }

    create = () => {

        this.animal.foodAnimals.push({
            id: 0,
            dateFood: this.dateFood.value,
            food:  {
                id: 0,
                name: this.food.value
            },
            gramage: this.gramage.value
        })

        this.animalService.postAnimal(this.animal).subscribe({
            next: (res: Animal) => {
                // this.updateanimalList.emit(0)
                console.log(res)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

    isUpdated = () => {
        return this.foodAnimal?.dateFood !== this.dateFood.value ||
            this.foodAnimal?.food.name !== this.food.value ||
            this.foodAnimal?.gramage !== this.gramage.value
    }

    onUpdated = () => {
        
        return this.animal.foodAnimals[0].dateFood !== this.dateFood.value ||
            this.animal.foodAnimals[0].food.name !== this.food.value ||
            this.animal.foodAnimals[0].gramage !== this.gramage.value
    }

    get dateFood() { return this.animalForm.get('dateFood')! as FormControl }
    get food() { return this.animalForm.get('food')! as FormControl }
    get gramage() { return this.animalForm.get('gramage')! as FormControl }

    get foodAnimal() {
        const foodAnimal = this.animal.foodAnimals.find(f => f.dateFood === this.dateFood.value)
//        return (foodAnimal ? foodAnimal : this.animal.foodAnimals.at(-1))
        return foodAnimal
    }

}
