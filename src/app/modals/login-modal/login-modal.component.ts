import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from 'src/app/models/Auth';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login-modal',
	standalone: true,
	imports: [NgIf, CommonModule, ReactiveFormsModule],
	templateUrl: './login-modal.component.html',
	styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  
	email: string = ''
	password: string = ''

	helper = new JwtHelperService();
	authForm!: FormGroup
	return!: string
  
	constructor (
		private authService: AuthService,
		private userService: ApiService<User>,
		private headerService: HeaderService,
		private route: ActivatedRoute,
		public activeModal: NgbActiveModal,
		private toastsService: ToastsService
	) {
		this.route.params.subscribe((params: Params) => this.return = params['return']);
	}
  
	auth: Auth = new Auth ('', '')
	
	isUpdated: boolean = false
  
	ngOnInit(): void {

		this.headerService.selectedMenuItem = ""
		this.headerService.signalItemSelected.set('')
			this.headerService.selectedSubMenuItem = ''
		this.headerService.signalSubItemSelected.set('')

		this.initForm()
		
	}        
  
	initForm = () => {
		this.authForm = new FormGroup({
			email: new FormControl('', Validators.required),
			password: new FormControl(environment.password ? environment.password : '', Validators.required),
		});    
		this.authForm.valueChanges.subscribe(changes => { 
			this.isUpdated = this.auth.email !== (this.authForm.get('email')! as FormControl).value  ||
			this.auth.password !== (this.authForm.get('password')! as FormControl).value 
			this.auth.email = (this.authForm.get('email')! as FormControl).value
			this.auth.password = (this.authForm.get('password')! as FormControl).value
		})
	}
  
	connexion() {
		this.authService.authenticate(this.auth).subscribe({
			next: (res: any) => {
				this.initForm()
				this.activeModal.close('Close click')
				this.toastsService.show('Vous êtes maintenant connecté !', 2000)
			}
		})
	}

	set user (user: User) {
		this.authService.user = user
		this.authService.signalUser.set(user)
	}

}
