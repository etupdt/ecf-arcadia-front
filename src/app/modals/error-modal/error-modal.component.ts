import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, effect } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-error-modal',
    standalone: true,
    imports: [],
    templateUrl: './error-modal.component.html',
    styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {

	@ViewChild('errorModal') errorModal!: ElementRef
	
    @Input() message: string = ''
    @Input() display: string = ''

    constructor(
        public activeModal: NgbActiveModal
    ) {}

}
