import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBreed } from 'src/app/interfaces/IBreed';
import { IElement } from 'src/app/interfaces/IElement';
import { IElementCrud } from 'src/app/interfaces/IElementCrud';
import { Breed } from 'src/app/models/Breed';
import { ItemsService } from 'src/app/services/items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breed-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './breed-form.component.html',
  styleUrl: './breed-form.component.scss'
})
export class BreedFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
            
    breedForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const IsUpdatedItem = this.itemsService.signalIsUpdatedItem()
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (this.itemsService.selectedIndex === -1) {
                this.breed = new Breed(0, '')
            } else {
                this.breed = Breed.deserialize(this.items[this.itemsService.selectedIndex], 1)
            }
            this.initForm()
        })
    }    

    get items() {return this.itemsService.items}

    get breed() {return this.itemsService.updatedItem}
    set breed(breed : IBreed) { this.itemsService.updatedItem = breed }

    get label() { return this.breedForm.get('label')! as FormControl }

    ngOnInit(): void {

        this.breed = new Breed(0, '')
        
        this.initForm()
    
    }        

    initForm = () => {
        this.breedForm = new FormGroup({
            label: new FormControl(this.breed.label, Validators.required),
        });    
        this.breedForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.breed.label !== this.label.value 
            )
            this.itemsService.signalIsValid.set(this.breedForm.valid)
            this.breed.label = this.label.value
        })
    }

}
