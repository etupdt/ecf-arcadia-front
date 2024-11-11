import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { Contact } from 'src/app/models/Contact';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

    contactForm!: FormGroup

    constructor (
        private contactService: ApiService<Contact>,
        private headerService: HeaderService,
        private toastsService: ToastsService,
        private modalService: NgbModal
    ) {

    }

    contact: Contact = new Contact('', '', '')

    get title() { return this.contactForm.get('title')! as FormControl }
    get description() { return this.contactForm.get('description')! as FormControl }
    get email() { return this.contactForm.get('email')! as FormControl }
    
    isUpdated: boolean = false
           
    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Contact"
        this.headerService.signalItemSelected.set('Contact')
        this.headerService.selectedSubMenuItem = ''
        this.headerService.signalSubItemSelected.set('')

        this.initForm()
        
    }        

    initForm = () => {
        this.contactForm = new FormGroup({
            title: new FormControl(this.contact.title, Validators.required),
            description: new FormControl(this.contact.description, Validators.required),
            email: new FormControl(this.contact.email, Validators.required),
        });    
        this.contactForm.valueChanges.subscribe(changes => { 
            this.isUpdated = this.contact.email !== this.email.value  ||
            this.contact.title !== this.title.value ||
            this.contact.description !== this.description.value 
            this.contact.title = this.title.value
            this.contact.description = this.description.value
            this.contact.email = this.email.value
        })
    }

    send() {
        this.contactService.postItem('contact', this.contact).subscribe({
            next: (res: any) => {
                this.toastsService.show("Votre demande de contact a bien été envoyée !", 6000)
            },
            error: (error: any) => {
                this.toastsService.show("Erreur lors de votre demande de contact !", 6000)
            }    
        })
    }

}
