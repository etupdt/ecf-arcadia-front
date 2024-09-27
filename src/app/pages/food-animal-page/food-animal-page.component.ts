import { Component, Injector, OnInit, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { AnimalFoodFormComponent } from "../../components/animal-food-form/animal-food-form.component";
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodAnimal } from 'src/app/models/FoodAnimal';
import { Animal } from 'src/app/models/Animal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { Food } from 'src/app/models/Food';
import { IElement } from 'src/app/interfaces/IElement';

@Component({
    selector: 'app-food-animal-page',
    templateUrl: './food-animal-page.component.html',
    styleUrls: ['./food-animal-page.component.scss'],
    standalone: true,
    imports: [AnimalFoodFormComponent, FormsModule, RouterOutlet]
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
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        this.router.navigate([{ outlets: { list: [ 'list' ] }}], {relativeTo:this.route}).then(ok => 
            this.router.navigate([{ outlets: { form: [ 'form' ] }}], {relativeTo:this.route})
        )
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
        }, { allowSignalWrites: true });
    }

    uri: string = 'foodanimals'
    
    get items(): Animal[] {return this.genericService.items}
    
    get updatedItem(): FoodAnimal {return this.items[this.selectedIndex].foodAnimals[this.genericService.subSelectedIndex]}
    // set updatedItem(foodAnimal: FoodAnimal) {
    //     this.genericService.subUpdatedItem = foodAnimal
    //     this.genericService.signalSubUpdatedItem.set(foodAnimal)
    // }

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
    
    ngOnInit(): void {

        this.headerService.selectedMenuItem = this.headerService.user.role
        this.headerService.signalItemSelected.set(this.headerService.selectedMenuItem)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(this.headerService.selectedSubMenuItem)

    }

    create = () => {
        // this.inCreation = this.dateFood
    }
    
    update = () => {
        console.log(this.updatedItem)
        if (this.updatedItem.id === 0) {
            this.foodAnimalService.postItem('foodanimals', FoodAnimal.deserialize(this.updatedItem, 1)).subscribe({
                next: (res: FoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
                    console.log(res)
                    this.updatedItem.id = res.id
                    // this.genericService.subSelectedIndex = this.items[this.selectedIndex].foodAnimals!.length - 1
                    // this.genericService.signalSubSelectedIndex.set(this.genericService.subSelectedIndex)
                    this.toastsService.show('l\'element a bien été créé !', 2000)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        } else {

            this.foodAnimalService.putItem('foodanimals', this.updatedItem.id, FoodAnimal.deserialize(this.updatedItem, 1)).subscribe({
                next: (res: FoodAnimal) => {
                    this.genericService.signalIsUpdated.set(false)
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
                console.log("delete = ", this.genericService.selectedIndex, this.genericService.subSelectedIndex)
                this.genericService.signalIsUpdated.set(false)
                const index = this.items[this.selectedIndex].foodAnimals!.findIndex((f: FoodAnimal) => {
                    return f.dateFood === this.updatedItem.dateFood
                })
                this.items[this.selectedIndex].foodAnimals!.splice(index, 1)
                this.genericService.subSelectedIndex = this.items[this.selectedIndex].foodAnimals!.length > 0 ? 0 : -1
                this.genericService.signalSubSelectedIndex.set(this.genericService.subSelectedIndex)
                this.toastsService.show('l\'element a bien été supprimé !', 2000)
                console.log("delete donne = ", this.genericService.selectedIndex, this.genericService.subSelectedIndex)
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
