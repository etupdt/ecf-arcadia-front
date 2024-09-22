import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, effect } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from 'src/app/services/header.service';

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
        private modalService: NgbModal
    ) {}

    close () {
        this.errorModal.nativeElement.style.display = 'none'
    }
}
