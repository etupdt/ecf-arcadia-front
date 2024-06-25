import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IAnimal } from 'src/app/interfaces/IAnimal';
import { IHabitat } from 'src/app/interfaces/IHabitat';
import { IBreed } from 'src/app/interfaces/IBreed';
import { Animal } from 'src/app/models/Animal';
import { Habitat } from 'src/app/models/Habitat';
import { Breed } from 'src/app/models/Breed';
import { Image } from 'src/app/models/Image';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { CarouselComponent } from '../carousel/carousel.component';
import { ImageCropComponent } from "../image-crop/image-crop.component";

@Component({
    selector: 'app-animal-form',
    templateUrl: './animal-form.component.html',
    styleUrls: ['./animal-form.component.scss'],
    standalone: true,
    imports: [NgIf, CommonModule, FormsModule, ReactiveFormsModule, CarouselComponent, ImageCropComponent]
})
export class AnimalFormComponent implements OnInit, OnChanges {

    useBackendImages: string = `${environment.useBackendImages}`
        
    animalForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
        private breedService: ApiService<IBreed>,
        private habitatService: ApiService<IHabitat>
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (selectedIndex === -1) {
                this.animal = new Animal(0, '', '', '', new Breed(0, ''), new Habitat (0, '', '', '', [], []), [], [], [])
            } else {
                this.animal = new Animal (
                    this.selectedItem.id,
                    this.selectedItem.firstname,
                    this.selectedItem.health,
                    this.selectedItem.description,
                    this.selectedItem.breed,
                    this.selectedItem.habitat,
                    this.selectedItem.images,
                    this.selectedItem.veterinaryReports,
                    this.selectedItem.foodAnimals
                )
            }
            this.initForm()
        })
    }    

    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
    }

    breeds$: Observable<IBreed[]> = this.breedService.getItems('breeds')
    habitat$: Observable<IHabitat[]> = this.habitatService.getItems('habitats')

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: IAnimal) {this.itemsService.items[this.itemsService.selectedIndex]}

    get animal() { return this.itemsService.updatedItem }
    set animal(animal : IAnimal) { this.itemsService.updatedItem = animal }

    get firstname() { return this.animalForm.get('firstname')! as FormControl }
    get health() { return this.animalForm.get('health')! as FormControl }
    get description() { return this.animalForm.get('description')! as FormControl }
    get breed() { return this.animalForm.get('breed')! as FormControl }
    get habitat() { return this.animalForm.get('habitat')! as FormControl }

    ngOnInit(): void {

        this.animal = new Animal(0, '', '', '', new Breed(0, ''), new Habitat (0, '', '', '', [], []), [], [], [])
        
        this.initForm()
    
    }        

    initForm = () => {
        this.animalForm = new FormGroup({
            firstname: new FormControl(this.animal.firstname, Validators.required),
            health: new FormControl(this.animal.health, Validators.required),
            description: new FormControl(this.animal.description, Validators.required),
            breed: new FormControl(this.animal.breed.id, Validators.required),
            habitat: new FormControl(this.animal.habitat.id, Validators.required),
        });    
        this.animalForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.animal.firstname !== this.firstname.value ||
                this.animal.health !== this.health.value ||
                this.animal.description !== this.description.value ||
                this.animal.breed.id !== this.breed.value ||
                this.animal.habitat.id !== this.habitat.value
            )
            this.itemsService.signalIsValid.set(this.animalForm.valid)
            this.animal.firstname = this.firstname.value
            this.animal.health = this.health.value
            this.animal.description = this.description.value
            this.animal.breed.id = this.breed.value
            this.animal.habitat.id = this.habitat.value
        })
    }

    onDeleteImage = (index: number) => {
        this.animal.images.splice(index,1)
    }

    onAddImage = (image: Image) => {
        this.animal.images.push(image)
    }    

}
