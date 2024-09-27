import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFood } from 'src/app/interfaces/IFood';
import { Food } from 'src/app/models/Food';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.scss'
})
export class FoodFormComponent {
    useBackendImages: string = `${environment.useBackendImages}`
            
    foodForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const IsUpdatedItem = this.itemsService.signalIsUpdatedItem()
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (this.itemsService.selectedIndex === -1) {
                this.food = new Food()
            } else {
                this.food = Food.deserialize(this.items[this.itemsService.selectedIndex], 1)
            }
            this.initForm()
        })
    }    

    get items() {return this.itemsService.items}

    get food() { return this.itemsService.updatedItem }
    set food(food : IFood) { this.itemsService.updatedItem = food }

    get name() { return this.foodForm.get('name')! as FormControl }

    ngOnInit(): void {

        this.food = new Food()
        
        this.initForm()
    
    }        

    initForm = () => {
        this.foodForm = new FormGroup({
            name: new FormControl(this.food.name, Validators.required),
        });    
        this.foodForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.food.name !== this.name.value 
            )
            this.itemsService.signalIsValid.set(this.foodForm.valid)
            this.food.name = this.name.value
        })
    }

}
