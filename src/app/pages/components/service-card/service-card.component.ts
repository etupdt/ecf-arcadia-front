import { Component, Input } from '@angular/core';
import { Service } from 'src/app/interfaces/Service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-service-card',
    templateUrl: './service-card.component.html',
    styleUrls: ['./service-card.component.scss'],
    standalone: true
})
export class ServiceCardComponent {

  useBackendImages: string = `${environment.useBackendImages}`

  @Input() service! : Service

}
