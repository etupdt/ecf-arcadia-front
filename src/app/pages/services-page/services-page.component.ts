import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/Service';
import { HeaderService } from 'src/app/services/header.service';
import { ServiceService } from 'src/app/services/service.service';
import { ServiceCardComponent } from "../components/service-card/service-card.component";

@Component({
    selector: 'app-services-page',
    templateUrl: './services-page.component.html',
    styleUrls: ['./services-page.component.scss'],
    standalone: true,
    imports: [CommonModule, ServiceCardComponent]
})
export class ServicesPageComponent {

  services$: Observable<Service[]> = this.serviceService.getServices()

  constructor(
    private serviceService: ServiceService,
    private headerService: HeaderService,
  ) { }  

  ngOnInit(): void {

    this.headerService.selectedMenuItem = "Services"
    this.headerService.signalItemSelected.set('Services')

  }

}
