import { NgIf } from '@angular/common';
import { Component, Injector, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service } from 'src/app/interfaces/Service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class ServiceFormComponent implements OnInit, OnDestroy {

    useBackendImages: string = `${environment.useBackendImages}`
        
    serviceForm!: FormGroup

    private itemsService: any

    params!: Params

    parameters: Subscription = this.route.params.subscribe(params => {
        this.params = params
    })

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            if (selectedIndex === -1) {
                this.service = {
                    id: 0,
                    name: '',
                    description: ''
                }
            } else {
                this.service = {
                    id: this.selectedItem.id,
                    name: this.selectedItem.name,
                    description: this.selectedItem.description
                }    
            }
            this.initForm()
        })
    }    

    ngOnDestroy(): void {
        this.parameters.unsubscribe()
    }

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Service) {this.itemsService.items[this.itemsService.selectedIndex]}

    get service() { return this.itemsService.updatedItem }
    set service(service : Service) { this.itemsService.updatedItem = service }

    get name() { return this.serviceForm.get('name')! as FormControl }
    get description() { return this.serviceForm.get('description')! as FormControl }

    ngOnInit(): void {

        this.service = {
            id: 0,
            name: '',
            description: ''
        }
        
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
