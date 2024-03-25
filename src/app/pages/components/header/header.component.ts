import { Component, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent {

    selectedItem: string = 'Services'

    constructor (
        private headerService: HeaderService
    ) {
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
        });
    }


}
