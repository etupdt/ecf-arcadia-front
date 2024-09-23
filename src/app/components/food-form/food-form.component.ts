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
            if (selectedIndex === -1) {
                this.Food = new Food(0, '')
            } else {
                this.Food = new Food(this.selectedItem.id, this.selectedItem.name)
            }
            this.initForm()
        })
    }    

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: IFood) {this.itemsService.items[this.itemsService.selectedIndex]}

    get Food() { return this.itemsService.updatedItem }
    set Food(Food : IFood) { this.itemsService.updatedItem = Food }

    get name() { return this.foodForm.get('name')! as FormControl }

    ngOnInit(): void {

        this.Food = new Food(0, '')
        
        this.initForm()
    
    }        

    initForm = () => {
        this.foodForm = new FormGroup({
            name: new FormControl(this.Food.name, Validators.required),
        });    
        this.foodForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.Food.name !== this.name.value 
            )
            this.itemsService.signalIsValid.set(this.foodForm.valid)
            this.Food.name = this.name.value
        })
    }

}
