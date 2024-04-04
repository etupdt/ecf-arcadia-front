import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Service } from 'src/app/interfaces/Service';
import { ItemsService } from 'src/app/services/items.service';
import { ServiceService } from 'src/app/services/service.service';
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

    @Input() service!: Service 

}
