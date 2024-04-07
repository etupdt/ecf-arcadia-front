import { Component, effect } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { FoodAnimalService } from 'src/app/services/food-animal.service';
import { HeaderService } from 'src/app/services/header.service';
import { ItemsService } from 'src/app/services/items.service';
import { AnimalFoodComponent } from "../components/animal-food/animal-food.component";

@Component({
    selector: 'app-food-animal-page',
    templateUrl: './food-animal-page.component.html',
    styleUrls: ['./food-animal-page.component.scss'],
    standalone: true,
    imports: [AnimalFoodComponent]
})
export class FoodAnimalPageComponent {

    constructor (
        private headerService: HeaderService,
        private animalService: ItemsService<Animal>,
        private foodAnimalService: ItemsService<FoodAnimalService>,
    ) {
        effect(() => {
            this.isUpdated = this.animalService.signalIsUpdated()
            this.isValid = this.animalService.signalIsValid()
        });
    }

    animals!: Animal[]

    selectedIndex!: number
    
    isUpdated: boolean = false
    isValid: boolean = false
    
    inCreation: boolean = false
    
    fields: (keyof Animal)[] = ['id', 'firstname', "description"]

    get selectedItem() {return this.animalService.selectedItem}
    
    ngOnInit(): void {

        this.readAll()

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    }

    readAll = () => {
        this.animalService.getItems('animals').subscribe({
            next: (res: Animal[]) => {
                this.animals = res
                this.selectedIndex = 0
                this.animalService.selectedItem = this.animals[this.selectedIndex]
                this.read(this.selectedIndex)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
    }

    create = () => {
        this.inCreation = true
        this.animalService.signalSelectedItem.set(this.animalService.selectedItem)
    }
    
    read = (index: number) => {
        if (index > -1 && index < this.animals.length) {
            this.selectedIndex = index
            this.animalService.selectedItem = this.animals[index]
            this.animalService.signalSelectedItem.set(this.animalService.selectedItem)
            this.animalService.signalIsUpdated.set(false)
        } else {
            this.selectedIndex = -1
            this.animalService.signalSelectedItem.set(this.animalService.selectedItem)
        }        
    }        
    
    cancel = () => {
        this.inCreation = false
        this.read(this.selectedIndex)
    }

}
