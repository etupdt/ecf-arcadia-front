import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LinksComponent } from '../links/links.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { User } from 'src/app/models/User';
import { ErrorModalComponent } from "../../modals/error-modal/error-modal.component";
import { ApiService } from 'src/app/services/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, LinksComponent, RouterModule, ErrorModalComponent]
})
export class HeaderComponent {
	
    selectedItem: string = ''
    selectedSubItem: string = ''

    user: User = new User()
    
    messageModal: string = ''
    displayErrorModal: string = 'hidden'
    
    get admin() {return this.user.role === 'ADMIN'}
    get employee() {return this.user.role === 'EMPLOYEE'}
    get veterinary() {return this.user.role === 'VETERINARY'}
    
    dropDownItems = [
        {auth: 'ADMIN', label: 'Animaux', link: 'AnimalsAdmin'},
        {auth: 'ADMIN', label: 'Habitats', link: 'HabitatsAdmin'},
        {auth: 'ADMIN', label: 'Horaires', link: 'HoursAdmin'},
        {auth: 'ADMIN', label: 'Races', link: 'BreedsAdmin'},
        {auth: 'ADMIN', label: 'Nouriture', link: 'FoodsAdmin'},
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

    get connected() {return this.admin || this.employee || this.veterinary}

    helper = new JwtHelperService();

    constructor (
        private headerService: HeaderService,
        private userService: ApiService<User>,
        private router: Router,
    ) {
        effect(() => {
            this.selectedItem = this.headerService.signalItemSelected()
            this.selectedSubItem = this.headerService.signalSubItemSelected()
            this.user = this.headerService.signalUser()
        });
        effect(() => {
            this.messageModal = this.headerService.signalModal().message
            this.displayErrorModal = this.headerService.signalModal().display
        });
        
        const localUserTokens = localStorage.getItem('arcadia_tokens'); 

        if (localUserTokens) {
            const userTokens: any = this.helper.decodeToken(JSON.parse(localUserTokens).access_token)
            if (Date.now() > userTokens.exp * 1000) {
                headerService.user = new User()
                headerService.signalUser.set(headerService.user)
                localStorage.removeItem('arcadia_tokens')
                this.router.navigate(['Accueil'])
            } else {
                this.userService.getItem('users', userTokens.id).subscribe({
                    next: (res: User) => {
                        this.headerService.user = res
                        this.headerService.signalUser.set(res)
                    },
                    error: (error: { error: { message: any; }; }) => {
                        this.headerService.modal = {modal: 'error', message:  error.error ? error.error.message : 'erruer non définie', display: "display: block;"}
                        this.headerService.signalModal.set(this.headerService.modal)
                        this.user = new User()
                    }    
                })
            }       
        }
        
    }

    logout = () => {
        this.headerService.user = new User()
        this.headerService.signalUser.set(this.headerService.user)
        localStorage.removeItem('arcadia_tokens')
        if (this.selectedSubItem !== '') {
            this.router.navigate(['Accueil'])
        }
    }

    navigateTo(index: number) { 
        if (this.selectedItem !== this.headerService.user.role || this.dropDownItem !== index) {
            this.dropDownItem = index
            this.router.navigate([this.dropDownItems[index].link])
        }
    }

    onCloseErrorModal() {
        this.displayErrorModal = ''
    }

}
