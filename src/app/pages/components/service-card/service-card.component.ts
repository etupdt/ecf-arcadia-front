import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/Service';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class ServiceCardComponent implements OnInit {

    constructor (
        private serviceService: ServiceService
    ) {}

    useBackendImages: string = `${environment.useBackendImages}`
    
    @Input() service!: Service
    @Input() updatable: Boolean = false
    
    @Output() updateServiceList: EventEmitter<number> = new EventEmitter()
    
    serviceForm!: FormGroup

    updated: boolean = false
    
    ngOnInit(): void {
        this.serviceForm = new FormGroup({
            name: new FormControl(this.service.name, Validators.required),
            description: new FormControl(this.service.description, Validators.required),
        });    
        if (!this.updatable) {
            this.name.disable()
            this.description.disable()
        }
        this.serviceForm.valueChanges.subscribe(change => {
            this.updated = this.isUpdated()
        })        

    }        

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log('toto')
    //     this.updated = this.isUpdated()
    // }
        
    delete = () => {
        
        this.serviceService.deleteService(this.service.id).subscribe({
            next: (res) => {
                this.updateServiceList.emit(0)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

    update = () => {

        this.service.name = this.name.value
        this.service.description = this.description.value

        this.serviceService.putService(this.service).subscribe({
            next: (res) => {
                this.updateServiceList.emit(0)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

    isUpdated = () => {
        return this.service.name !== this.name.value ||
               this.service.description !== this.description.value
    }

    get name() { return this.serviceForm.get('name')! as FormControl }
    get description() { return this.serviceForm.get('description')! as FormControl }

}
