import { Component, Input, effect } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-error-modal',
    standalone: true,
    imports: [],
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {

    @Input() message: string = ''
    @Input() display: string = ''
  
}
