import { Component, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LinksComponent } from '../links/links.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [LinksComponent, RouterModule]
})
export class HeaderComponent {

    selectedItem: string = ''

    constructor (
        private headerService: HeaderService
    ) {
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
        });
    }

}
