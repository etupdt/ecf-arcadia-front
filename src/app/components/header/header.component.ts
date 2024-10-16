import { Component, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LinksComponent } from '../links/links.component';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { LoginModalComponent } from 'src/app/modals/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, LinksComponent, RouterModule, LoginModalComponent]
})
export class HeaderComponent {
	
    selectedItem: string = ''
    selectedSubItem: string = ''

    get admin() {return this.user.role === 'ADMIN'}
    get employee() {return this.user.role === 'EMPLOYEE'}
    get veterinary() {return this.user.role === 'VETERINARY'}
    
    dropDownItems = [
        {auth: 'ADMIN', label: 'Animaux', link: 'AnimalsAdmin'},
        {auth: 'ADMIN', label: 'Habitats', link: 'HabitatsAdmin'},
        {auth: 'ADMIN', label: 'Horaires', link: 'HoursAdmin'},
        {auth: 'ADMIN', label: 'Races', link: 'BreedsAdmin'},
        {auth: 'ADMIN', label: 'Nourriture', link: 'FoodsAdmin'},
        {auth: 'ADMIN', label: 'Services', link: 'ServicesAdmin'},
        {auth: 'ADMIN', label: 'Utilisateurs', link: 'UsersAdmin'},
        {auth: 'ADMIN', label: 'Dashboard', link: 'DashboardAdmin'},
        {auth: 'ADMIN', label: 'Rapports Veto', link: 'Reports'},
        {auth: 'VETERINARY', label: 'Saisie rapports', link: 'ReportAnimalAdmin'},
        {auth: 'EMPLOYEE', label: 'Saisie alimentation', link: 'FoodAnimalAdmin'},
        {auth: 'EMPLOYEE', label: 'Rapports Veto', link: 'Reports'},
        {auth: 'EMPLOYEE', label: 'Avis', link: 'Avis'},
    ]

    dropDownItem: number = -1

    get user() {return this.authService.user}
    get connected() {return this.user.role !== ''} 

    constructor (
        private headerService: HeaderService,
        private authService: AuthService,
        private router: Router,
        private modalService: NgbModal,
    ) {
        this.authService.verifyConnection(0)    
        effect(() => {
            if (this.authService.signalUser()) {
            }
            this.selectedItem = this.headerService.signalItemSelected()
            this.selectedSubItem = this.headerService.signalSubItemSelected()
        })
    }

    login = () => {
        this.modalService.open(LoginModalComponent)!
    }

    logout = () => {
        this.authService.logout()
    }

    navigateTo(index: number) { 
        if (this.selectedItem !== this.authService.user.role || this.dropDownItem !== index) {
            this.dropDownItem = index
            this.router.navigate([this.dropDownItems[index].link])
        }
    }

}
