import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

    contactForm!: FormGroup

    constructor () {

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

    }

}
