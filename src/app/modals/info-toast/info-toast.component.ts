import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
    selector: 'app-info-toast',
    standalone: true,
    imports: [NgFor, NgbToastModule],
    templateUrl: './info-toast.component.html',
    styleUrl: './info-toast.component.scss'
})
export class InfoToastComponent {

    constructor (
        public toastsService: ToastsService
    ) {}

}
