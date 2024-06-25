import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBreed } from 'src/app/interfaces/IBreed';
import { Breed } from 'src/app/models/Breed';
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
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (selectedIndex === -1) {
                this.breed = new Breed(0, '')
            } else {
                this.breed = new Breed(this.selectedItem.id, this.selectedItem.label)
            }
            this.initForm()
        })
    }    

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: IBreed) {this.itemsService.items[this.itemsService.selectedIndex]}

    get breed() { return this.itemsService.updatedItem }
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
