import { NgIf } from '@angular/common';
import { Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IService } from 'src/app/interfaces/IService';
import { Service } from 'src/app/models/Service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class ServiceFormComponent implements OnInit {

    useBackendImages: string = `${environment.useBackendImages}`
        
    serviceForm!: FormGroup

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
                this.service = new Service()
            } else {
                this.service = Service.deserialize(this.items[this.itemsService.selectedIndex], 1)
            }
            this.initForm()
        })
    }    

    get items() {return this.itemsService.items}

    get service() { return this.itemsService.updatedItem }
    set service(service : IService) { this.itemsService.updatedItem = service }

    get name() { return this.serviceForm.get('name')! as FormControl }
    get description() { return this.serviceForm.get('description')! as FormControl }

    ngOnInit(): void {

        this.service = new Service()
        
        this.itemsService.signalIsUpdated.set(false)

        this.initForm()
    
    }        

    initForm = () => {
        this.serviceForm = new FormGroup({
            name: new FormControl(this.service.name, Validators.required),
            description: new FormControl(this.service.description, Validators.required),
        });    
        this.serviceForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.service.name !== this.name.value ||
                this.service.description !== this.description.value
            )
            this.itemsService.signalIsValid.set(this.serviceForm.valid)
            this.service.name = this.name.value
            this.service.description = this.description.value
        })
    }

}
