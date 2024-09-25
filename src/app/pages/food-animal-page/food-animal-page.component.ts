import { Component, Injector, OnInit, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { AnimalFoodComponent } from "../../components/animal-food/animal-food.component";
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFoodAnimal } from 'src/app/interfaces/IFoodAnimal';
import { FoodAnimal } from 'src/app/models/FoodAnimal';
import { IAnimal } from 'src/app/interfaces/IAnimal';
import { Animal } from 'src/app/models/Animal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
    selector: 'app-food-animal-page',
    templateUrl: './food-animal-page.component.html',
    styleUrls: ['./food-animal-page.component.scss'],
    standalone: true,
    imports: [AnimalFoodComponent, FormsModule, RouterOutlet]
})
export class FoodAnimalPageComponent<Tdata> implements OnInit{

    private genericService: any

    constructor (
        private headerService: HeaderService,
        private injector: Injector,
        private foodAnimalService: ApiService<FoodAnimal>,
        private router: Router,
        private route: ActivatedRoute,
        public datepipe: DatePipe,
        public toastsService: ToastsService,
        private modalService: NgbModal
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        this.router.navigate([{ outlets: { form: [ 'form' ] }}], {relativeTo:this.route})
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
            const noUse = this.genericService.signalSubSelectedIndex()
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

    get foodAnimalIndex() {return this.genericService.subSelectedIndex}

    isUpdated: boolean = false
    isValid: boolean = false
    
    inCreation: boolean = false
    
    ngOnInit(): void {
        this.router.navigate([{ outlets: { list: [ 'list' ] }}], {relativeTo:this.route})

        this.headerService.selectedMenuItem =  this.headerService.user.role
        this.headerService.signalItemSelected.set( this.headerService.user.role)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(path ? path : '')

        this.genericService.subSelectedIndex = -1
        this.genericService.signalSubSelectedIndex.set(this.genericService.subSelectedIndex)
    }

    create = () => {
        // this.inCreation = this.dateFood
    }
    
    update = () => {

        // this.updatedItem.dateFood = this.dateFood!

        if (this.updatedItem.id === 0) {
            this.foodAnimalService.postItem('foodanimals', this.updatedItem).subscribe({
                next: (res: FoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].foodAnimals!.push(res)
                    this.toastsService.show('l\'element a bien été créé !', 2000)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        } else {

            this.foodAnimalService.putItem('foodanimals', this.updatedItem.id, this.updatedItem).subscribe({
                next: (res: FoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].foodAnimals![this.foodAnimalIndex] = res
                    this.toastsService.show('l\'element a bien été mis à jour !', 2000)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        }

    }

    delete = () => {
        this.foodAnimalService.deleteItem('foodanimals', this.updatedItem.id).subscribe({
            next: (res: FoodAnimal) => {
                this.genericService.signalIsUpdated.set(false)
                this.items[this.selectedIndex].foodAnimals!.splice(this.foodAnimalIndex, 1)
                console.log(this.foodAnimalIndex)
                if (this.foodAnimalIndex >= this.items[this.selectedIndex].foodAnimals!.length) {
                    this.genericService.subSelectedIndex--
                    this.genericService.signalSubSelectedIndex.set(this.genericService.subSelectedIndex)
                }
                console.log(this.foodAnimalIndex)
                if (this.foodAnimalIndex < 0) {
                    this.genericService.subSelectedIndex = -1
                    this.genericService.signalSubSelectedIndex.set(this.genericService.subSelectedIndex)
                }
                console.log(this.foodAnimalIndex)
                this.toastsService.show('l\'element a bien été supprimé !', 2000)
            },
            error: (error: any) => {
            }
        })
}

    cancel = () => {
        this.genericService.isUpdatedItem++
        this.genericService.signalIsUpdatedItem.set(this.genericService.isUpdatedItem)
        this.selectedIndex = this.selectedIndex
    }

}
