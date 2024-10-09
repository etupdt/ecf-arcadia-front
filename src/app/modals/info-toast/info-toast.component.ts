import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
    selector: 'app-info-toast',
    standalone: true,
    imports: [NgIf, NgFor, NgbToastModule],
    templateUrl: './info-toast.component.html',
    styleUrl: './info-toast.component.scss'
})
export class InfoToastComponent {

    constructor (
        public toastsService: ToastsService,
        public authService: AuthService
    ) {}

    refreshToken() {
        console.log('appele refresh')
        this.authService.refreshToken()
    }

}
