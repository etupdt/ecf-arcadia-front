import { NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService  } from "@auth0/angular-jwt";
import { IToken } from 'src/app/interfaces/IToken';
import { Auth } from 'src/app/models/Auth';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

    helper = new JwtHelperService();
    authForm!: FormGroup
    return!: string
    
    constructor (
        private authService: ApiService<Auth>,
        private userService: ApiService<User>,
        private headerService: HeaderService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params: Params) => this.return = params['return']);
    }
    
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
                this.userService.getItem('users', this.helper.decodeToken(res.access_token).id).subscribe({
                    next: (res: User) => {
                        this.user = res
                        this.router.navigate([this.return])
                    },
                    error: (error: { error: { message: any; }; }) => {
                        this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                        this.headerService.signalModal.set(this.headerService.modal)
                        this.user = new User()
                    }    
                })
            },
            error: (error: { error: { message: any; }; }) => {
                console.log(error.error.message)
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
                this.user = new User()
            }    
        })
    }

    set user (user: User) {
        this.headerService.user = user
        this.headerService.signalUser.set(user)
    }

}    
