import { Component } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { ServiceCardComponent } from "../../components/service-card/service-card.component";
import { ViewFormComponent } from "../../components/view-form/view-form.component";
import { AnimalFormComponent } from "../components/animal-form/animal-form.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CrudPageComponent } from "../crud-page/crud-page.component";
import { ApiService } from 'src/app/services/api.service';
import { IView } from 'src/app/interfaces/IView';
import { IService } from 'src/app/interfaces/IService';
import { Service } from 'src/app/models/Service';

@Component({
    selector: 'app-employee-page',
    templateUrl: './employee-page.component.html',
    styleUrls: ['./employee-page.component.scss'],
    standalone: true,
    imports: [NgFor, RouterOutlet, CommonModule, ServiceCardComponent, ViewFormComponent, AnimalFormComponent, CrudPageComponent]
})
export class EmployeePageComponent {

    constructor(
        private headerService: HeaderService,
        private viewService: ApiService<IView>,
        private serviceService: ApiService<Service>,
        private route: ActivatedRoute
    ) { }  


    fields: (keyof IService)[] = ['name', 'description']

    views$: Observable<IView[]> = this.viewService.getItems('views')
    services$: Observable<IService[]> = this.serviceService.getItems('services')

    service: Service = new Service(0, '', '')

    new: boolean = false

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Employé"
        this.headerService.signalItemSelected.set('Employé')

    }

    addService = () => {
        this.service = new Service(0, '', '')
        this.new = true
    }

    updateService = (index: number) => {
        this.services$ = this.serviceService.getItems('services')
    } 
    
    updateCreateService = (index: number) => {
        this.services$ = this.serviceService.getItems('services')
        this.new = false
    } 
    
}
