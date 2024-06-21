import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';
import { ServiceCardComponent } from "../components/service-card/service-card.component";
import { IService } from 'src/app/interfaces/IService';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-services-page',
    templateUrl: './services-page.component.html',
    styleUrls: ['./services-page.component.scss'],
    standalone: true,
    imports: [CommonModule, ServiceCardComponent]
})
export class ServicesPageComponent {

    services$: Observable<IService[]> = this.serviceService.getItems('services')

    constructor(
        private serviceService: ApiService<IService>,
        private headerService: HeaderService,
    ) { }  

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Services"
        this.headerService.signalItemSelected.set('Services')
        this.headerService.selectedSubMenuItem = ''
        this.headerService.signalSubItemSelected.set('')

    }

}
