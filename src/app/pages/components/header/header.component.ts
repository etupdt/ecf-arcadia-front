import { Component, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LinksComponent } from '../links/links.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from 'src/app/models/User';
import { ErrorModalComponent } from "../../../modals/error-modal/error-modal.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgIf, LinksComponent, RouterModule, ErrorModalComponent]
})
export class HeaderComponent {

    selectedItem: string = ''
    user: User = new User()

    messageModal: string = ''
    displayModal: string = 'hidden'

    get admin() {return this.user.role === 'ADMIN'}
    get employee() {return this.user.role === 'EMPLOYEE'}
    get veterinary() {return this.user.role === 'VETERINARY'}

    get connected() {return this.admin || this.employee || this.veterinary}

    constructor (
        private headerService: HeaderService,
        private router: Router,
    ) {
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
            this.user = this.headerService.signalUser()
        });
        effect(() => {
            this.messageModal = this.headerService.signalModal().message
            this.displayModal = this.headerService.signalModal().display
        });
    }

    toggleConnexion = () => {
        if (this.connected) {
            this.headerService.user = new User()
            this.headerService.signalUser.set(this.headerService.user)
            localStorage.removeItem('arcadia_tokens')
        } else {
            this.router.navigate(['Auth', {return: this.selectedItem}])
        }
    }

}
