import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { Habitat } from 'src/app/interfaces/Habitat';
import { Race } from 'src/app/interfaces/Race';
import { ItemsService } from 'src/app/services/items.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-animal-form',
    templateUrl: './animal-form.component.html',
    styleUrls: ['./animal-form.component.scss'],
    standalone: true,
    imports: [NgIf, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AnimalFormComponent implements OnInit, OnChanges {

    useBackendImages: string = `${environment.useBackendImages}`
        
    animalForm!: FormGroup

    private itemsService: any

    params!: Params

    parameters: Subscription = this.route.params.subscribe(params => {
        this.params = params
    })

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
        private raceService: ItemsService<Race>,
        private habitatService: ItemsService<Habitat>
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            if (this.itemsService.signalSelectedItem()) {
                if ( this.params['id'] === '-1') {
                    this.animal = {
                        id: 0,
                        firstname: '',
                        description: '',
                        health: '',
                        race: {
                            id: 0,
                            label: ""
                        },
                                    habitat: {
                            id: 0,
                            name: ""
                        }
                    }
                } else {
                    this.animal = {
                        id: this.itemsService.selectedItem.id,
                        firstname: this.itemsService.selectedItem.firstname,
                        description: this.itemsService.selectedItem.description,
                        health: this.itemsService.selectedItem.health,
                        race: this.itemsService.selectedItem.race,
                        habitat: this.itemsService.selectedItem.habitat
                    }    
                }
                this.initForm()
            }
        })
    }    
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy(): void {
        this.parameters.unsubscribe()
    }

    races$: Observable<Race[]> = this.raceService.getItems('races')
    habitat$: Observable<Habitat[]> = this.habitatService.getItems('habitats')

    get animal() { return this.itemsService.updatedItem }
    set animal(animal : Animal) { this.itemsService.updatedItem = animal }

    get firstname() { return this.animalForm.get('firstname')! as FormControl }
    get health() { return this.animalForm.get('health')! as FormControl }
    get race() { return this.animalForm.get('race')! as FormControl }
    get habitat() { return this.animalForm.get('habitat')! as FormControl }

    ngOnInit(): void {

        this.animal = {
            id: 0,
            firstname: '',
            description: '',
            health: '',
            race: {
                id: 0,
                label: ""
            },
            habitat: {
                id: 0,
                name: ""
            }
        }
        
        this.initForm()
    
    }        

    initForm = () => {
        this.animalForm = new FormGroup({
            firstname: new FormControl(this.animal.firstname, Validators.required),
            health: new FormControl(this.animal.health, Validators.required),
            race: new FormControl(this.animal.race?.id, Validators.required),
            habitat: new FormControl(this.animal.habitat?.id, Validators.required),
        });    
        this.animalForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.animal.firstname !== this.firstname.value ||
                this.animal.health !== this.race.value ||
                this.animal.race?.id !== this.health.value ||
                this.animal.habitat?.id !== this.habitat.value
            )
            this.itemsService.signalIsValid.set(this.animalForm.valid)
            this.animal.firstname = this.firstname.value
            this.animal.health = this.health.value
            this.animal.race!.label = this.race.value
            this.animal.habitat!.id = this.habitat.value
        })
    }

}
