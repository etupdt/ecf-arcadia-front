import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from 'src/app/models/Auth';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
	selector: 'app-login-modal',
	standalone: true,
	imports: [NgIf, CommonModule, ReactiveFormsModule],
	templateUrl: './login-modal.component.html',
	styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  
	@ViewChild('closeLoginModal') closeLoginModal!: ElementRef
	
	@Input() display: string = ''

	email: string = ''
	password: string = ''

	helper = new JwtHelperService();
	authForm!: FormGroup
	return!: string
  
	constructor (
		private authService: ApiService<Auth>,
		private userService: ApiService<User>,
		private headerService: HeaderService,
		private route: ActivatedRoute,
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
			password: new FormControl('', Validators.required),
		});    
		this.authForm.valueChanges.subscribe(changes => { 
			this.isUpdated = this.auth.email !== (this.authForm.get('email')! as FormControl).value  ||
			this.auth.password !== (this.authForm.get('password')! as FormControl).value 
			this.auth.email = (this.authForm.get('email')! as FormControl).value
			this.auth.password = (this.authForm.get('password')! as FormControl).value
		})
	}
  
	connexion() {
		this.authService.postItem('auth/authenticate', this.auth).subscribe({
			next: (res: any) => {
				localStorage.setItem('arcadia_tokens', JSON.stringify(res))
				this.userService.getItem('users', this.helper.decodeToken(res.access_token).id).subscribe({
					next: (res: User) => {
						this.user = res
						this.initForm()
						this.closeLoginModal.nativeElement.click()
					}    
				})
			}
		})
	}

	set user (user: User) {
		this.headerService.user = user
		this.headerService.signalUser.set(user)
	}

}
