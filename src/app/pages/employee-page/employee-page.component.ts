import { Component } from '@angular/core';
import { HabitatService } from 'src/app/services/habitat.service';
import { HeaderService } from 'src/app/services/header.service';
import { ViewComponentComponent } from "../components/view-component/view-component.component";
import { Observable } from 'rxjs';
import { View } from 'src/app/interfaces/View';
import { ViewService } from 'src/app/services/view.service';
import { CommonModule, NgFor } from '@angular/common';
import { Service } from 'src/app/interfaces/Service';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceCardComponent } from "../components/service-card/service-card.component";

@Component({
    selector: 'app-employee-page',
    templateUrl: './employee-page.component.html',
    styleUrls: ['./employee-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, ViewComponentComponent, ServiceCardComponent]
})
export class EmployeePageComponent {

    constructor(
        private headerService: HeaderService,
        private viewService: ViewService,
        private serviceService: ServiceService,
    ) { }  

    views$: Observable<View[]> = this.viewService.getViews()
    services$: Observable<Service[]> = this.serviceService.getServices()

    service: Service = {
        id: 0,
        name: "",
        description: ""
    }

    new: boolean = false

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Employé"
        this.headerService.signalItemSelected.set('Employé')

    }

    addService = () => {
        const service = {
            id: 0,
            name: "",
            description: ""
        }
        this.service = service
        this.new = true
    }

    updateService = (index: number) => {
        this.services$ = this.serviceService.getServices()
    } 
    
    updateCreateService = (index: number) => {
        this.services$ = this.serviceService.getServices()
        this.new = false
    } 
    
}
