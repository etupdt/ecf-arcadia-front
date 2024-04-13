import { NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuth } from 'src/app/interfaces/IAuth';
import { IToken } from 'src/app/interfaces/IToken';
import { Auth } from 'src/app/models/Auth';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

    authForm!: FormGroup
    
    constructor (
        private authService: ApiService<Auth>
    ) {}
    
    auth: Auth = new Auth ('', '')
    
    get email() { return this.authForm.get('email')! as FormControl }
    get password() { return this.authForm.get('password')! as FormControl }
    
    isUpdated: boolean = false
    
    ngOnInit(): void {

        this.initForm()
        
    }        
    
    initForm = () => {
        this.authForm = new FormGroup({
            email: new FormControl(this.auth.email, Validators.required),
            password: new FormControl(this.auth.password, Validators.required),
        });    
        this.authForm.valueChanges.subscribe(changes => { 
            this.isUpdated = this.auth.email !== this.email.value  ||
            this.auth.password !== this.password.value 
            this.auth.email = this.email.value
            this.auth.password = this.password.value
        })
    }
    
    connexion() {
        this.authService.postItem('auth/authenticate', this.auth).subscribe({
            next: (res: any) => {
                localStorage.setItem('arcadia_tokens', JSON.stringify(res))
            },
            error: (error: { error: { message: any; }; }) => {
            }    
        })
    }

}    
