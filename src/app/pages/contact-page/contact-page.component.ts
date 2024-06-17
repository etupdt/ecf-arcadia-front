import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

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
    ) {

    }

    contact: Contact = new Contact('', '', '')

    get title() { return this.contactForm.get('title')! as FormControl }
    get description() { return this.contactForm.get('description')! as FormControl }
    get email() { return this.contactForm.get('email')! as FormControl }
    
    isUpdated: boolean = false
        
    ngOnInit(): void {

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
                this.headerService.modal = {modal: 'info', message: res, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            },
            error: (error: { error: { message: any; }; }) => {
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            }    
        })
    }

}
