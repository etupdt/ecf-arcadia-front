import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRace } from 'src/app/interfaces/IRace';
import { Race } from 'src/app/models/Race';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-race-form',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './race-form.component.html',
  styleUrl: './race-form.component.scss'
})
export class RaceFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
            
    raceForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (selectedIndex === -1) {
                this.race = new Race(0, '')
            } else {
                this.race = new Race(this.selectedItem.id, this.selectedItem.label)
            }
            this.initForm()
        })
    }    

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: IRace) {this.itemsService.items[this.itemsService.selectedIndex]}

    get race() { return this.itemsService.updatedItem }
    set race(race : IRace) { this.itemsService.updatedItem = race }

    get label() { return this.raceForm.get('label')! as FormControl }

    ngOnInit(): void {

        this.race = new Race(0, '')
        
        this.initForm()
    
    }        

    initForm = () => {
        this.raceForm = new FormGroup({
            label: new FormControl(this.race.label, Validators.required),
        });    
        this.raceForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.race.label !== this.label.value 
            )
            this.itemsService.signalIsValid.set(this.raceForm.valid)
            this.race.label = this.label.value
        })
    }

}
