import { Component, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LinksComponent } from '../links/links.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgIf, LinksComponent, RouterModule]
})
export class HeaderComponent {

    selectedItem: string = ''
    user: User = new User()

    get admin() {return this.user.role === 'ADMIN'}
    get employee() {return this.user.role === 'EMPLOYEE'}
    get veterinary() {return this.user.role === 'VETERINARY'}

    get connected() {return this.admin || this.employee || this.veterinary}

    constructor (
        private headerService: HeaderService,
        private router: Router,
    ) {
        console.log('construct header component : ', this)
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
            this.user = this.headerService.signalUser()
        });
    }

    toggleConnexion = () => {
        if (this.connected) {
            this.headerService.user = new User()
            this.headerService.signalUser.set(this.headerService.user)
        } else {
            this.router.navigate(['Auth', {return: this.selectedItem}])
        }
    }

}
