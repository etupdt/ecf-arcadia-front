import { Component, effect } from '@angular/core';
import { HoursComponent } from '../hours/hours.component';
import { LinksComponent } from "../links/links.component";
import { HeaderService } from 'src/app/services/header.service';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [HoursComponent, LinksComponent, ContactsComponent]
})
export class FooterComponent {

    selectedItem: string = 'Services'

    constructor (
        private headerService: HeaderService
    ) {
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
        });
    }

}
