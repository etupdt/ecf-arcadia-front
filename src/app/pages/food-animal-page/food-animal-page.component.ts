import { Component, Injector, effect } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { HeaderService } from 'src/app/services/header.service';
import { AnimalFoodComponent } from "../components/animal-food/animal-food.component";
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFoodAnimal } from 'src/app/interfaces/IFoodAnimal';
import { FoodAnimal } from 'src/app/models/FoodAnimal';

@Component({
    selector: 'app-food-animal-page',
    templateUrl: './food-animal-page.component.html',
    styleUrls: ['./food-animal-page.component.scss'],
    standalone: true,
    imports: [AnimalFoodComponent, FormsModule, RouterOutlet]
})
export class FoodAnimalPageComponent<Tdata> {

    private genericService: any

    constructor (
        private headerService: HeaderService,
        private animalService: ApiService<Animal>,
        private injector: Injector,
        private foodAnimalService: ApiService<IFoodAnimal>,
        private router: Router,
        private route: ActivatedRoute,
        public datepipe: DatePipe
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        this.router.navigate([{ outlets: { form: [ 'form' ] }}], {relativeTo:this.route})
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
        });
    }

    uri: string = 'foodanimals'
    
    get items(): Animal[] {return this.genericService.items}
    
    get updatedItem(): FoodAnimal {return this.genericService.updatedItem}

    get selectedIndex(): number {return this.genericService.selectedIndex}
    set selectedIndex(index: number) {
        this.inCreation = false
        this.genericService.signalIsUpdated.set(false)
        this.genericService.selectedIndex = index
        this.genericService.signalSelectedIndex.set(index)
    }    

    isUpdated: boolean = false
    isValid: boolean = false
    
    inCreation: boolean = false
    
    foodAnimalIndex: number = -1

    ngOnInit(): void {
        this.router.navigate([{ outlets: { list: [ 'list' ] }}], {relativeTo:this.route})
        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    }

    create = () => {
        // this.inCreation = this.dateFood
    }
    
    update = () => {

        // this.updatedItem.dateFood = this.dateFood!

        if (this.updatedItem.id === 0) {
            this.foodAnimalService.postItem('foodanimals', this.updatedItem).subscribe({
                next: (res: IFoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].foodAnimals!.push(res)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        } else {

            this.foodAnimalService.putItem('foodanimals', this.updatedItem.id, this.updatedItem).subscribe({
                next: (res: IFoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].foodAnimals![this.foodAnimalIndex] = res
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        }

    }

    cancel = () => {
        this.genericService.isUpdatedItem++
        this.genericService.signalIsUpdatedItem.set(this.genericService.isUpdatedItem)
        this.selectedIndex = this.selectedIndex
    }

}
