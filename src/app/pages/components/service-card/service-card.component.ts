import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IService } from 'src/app/interfaces/IService';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class ServiceCardComponent {

    useBackendImages: string = `${environment.useBackendImages}`
    
    serviceForm!: FormGroup

    @Input() service!: IService 

}
