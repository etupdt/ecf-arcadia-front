import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IHours } from 'src/app/interfaces/IHours';
import { Hours } from 'src/app/models/Hours';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hours-form',
  templateUrl: './hours-form.component.html',
  styleUrls: ['./hours-form.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class HoursFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
            
    hoursForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const IsUpdatedItem = this.itemsService.signalIsUpdatedItem()
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (this.itemsService.selectedIndex === -1) {
                this.hours = new Hours()
            } else {
                this.hours = Hours.deserialize(this.items[this.itemsService.selectedIndex], 1)
            }
            this.initForm()
        })
    }    

    get items() {return this.itemsService.items}

    get hours() { return this.itemsService.updatedItem }
    set hours(hours : IHours) { this.itemsService.updatedItem = hours }

    get monday() { return this.hoursForm.get('monday')! as FormControl }
    get tuesday() { return this.hoursForm.get('tuesday')! as FormControl }
    get wednesday() { return this.hoursForm.get('wednesday')! as FormControl }
    get thursday() { return this.hoursForm.get('thursday')! as FormControl }
    get friday() { return this.hoursForm.get('friday')! as FormControl }
    get saturday() { return this.hoursForm.get('saturday')! as FormControl }
    get sunday() { return this.hoursForm.get('sunday')! as FormControl }

    ngOnInit(): void {

        this.hours = new Hours()
        
        this.initForm()
    
    }        

    initForm = () => {
        this.hoursForm = new FormGroup({
            monday: new FormControl(this.hours.monday, Validators.required),
            tuesday: new FormControl(this.hours.tuesday, Validators.required),
            wednesday: new FormControl(this.hours.wednesday, Validators.required),
            thursday: new FormControl(this.hours.thursday, Validators.required),
            friday: new FormControl(this.hours.friday, Validators.required),
            saturday: new FormControl(this.hours.saturday, Validators.required),
            sunday: new FormControl(this.hours.sunday, Validators.required),
        });    
        this.hoursForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.hours.monday !== this.monday.value ||
                this.hours.tuesday !== this.tuesday.value ||
                this.hours.wednesday !== this.wednesday.value ||
                this.hours.thursday !== this.thursday.value ||
                this.hours.friday !== this.friday.value ||
                this.hours.saturday !== this.saturday.value ||
                this.hours.sunday !== this.sunday.value 
            )
            this.itemsService.signalIsValid.set(this.hoursForm.valid)
            this.hours.monday = this.monday.value
            this.hours.tuesday = this.tuesday.value
            this.hours.wednesday = this.wednesday.value
            this.hours.thursday = this.thursday.value
            this.hours.friday = this.friday.value
            this.hours.saturday = this.saturday.value
            this.hours.sunday = this.sunday.value
        })
    }

}
