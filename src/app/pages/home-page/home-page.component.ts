import { Component, OnInit } from '@angular/core';
import { IView } from 'src/app/interfaces/IView';
import { ViewFormComponent } from '../../components/view-form/view-form.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { HabitatCardComponent } from '../components/habitat-card/habitat-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderService } from 'src/app/services/header.service';
import { Observable } from 'rxjs';
import { HabitatListComponent } from "../components/habitat-list/habitat-list.component";
import { IHabitat } from 'src/app/interfaces/IHabitat';
import { ApiService } from 'src/app/services/api.service';
import { View } from 'src/app/models/View';
import { Service } from 'src/app/models/Service';
import { ViewFilterPipe } from 'src/app/pipes/view-filter.pipe';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    providers: [],
    imports: [
        NgFor,
        CommonModule, 
        HabitatCardComponent, 
        ServiceCardComponent, 
        ViewFormComponent, 
        HabitatListComponent,
        ViewFilterPipe
    ]
})
export class HomePageComponent implements OnInit {

    constructor(
        private habitatService: ApiService<IHabitat>,
        private serviceService: ApiService<Service>,
        private viewService: ApiService<IView>,
        private headerService: HeaderService
    ) { }

    habitats$: Observable<IHabitat[]> = this.habitatService.getItems('habitats')
    services$: Observable<Service[]> = this.serviceService.getItems('services')
    views$: Observable<IView[]> = this.viewService.getItems('views')

    view: IView = new View(0, "", "", false)

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Accueil"
        this.headerService.signalItemSelected.set('Accueil')

    }

}
