import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class UserFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
            
    userForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            const selectedIndex = this.itemsService.signalSelectedIndex()
            this.initItem(this.itemsService.selectedIndex)
        })
        effect(() => {
            const nonValue = this.itemsService.signalIsUpdatedItem()
            this.initItem(this.itemsService.selectedIndex)
        })
    }    

    get selectedItem() { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: User) {this.itemsService.items[this.itemsService.selectedIndex]}

    get user() { return this.itemsService.updatedItem }
    set user(user : User) { this.itemsService.updatedItem = user }

    get username() { return this.userForm.get('username')! as FormControl }
    get firstname() { return this.userForm.get('firstname')! as FormControl }
    get lastname() { return this.userForm.get('lastname')! as FormControl }

    ngOnInit(): void {

        this.user = {
            id: 0,
            username: '',
            firstname: '',
            lastname: '',
        }
        
        this.initForm()
    
    }        

    initForm = () => {
        this.userForm = new FormGroup({
            username: new FormControl(this.user.username, Validators.required),
            firstname: new FormControl(this.user.firstname, Validators.required),
            lastname: new FormControl(this.user.lastname, Validators.required),
        });    
        this.userForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.user.username !== this.username.value ||
                this.user.firstname !== this.firstname.value ||
                this.user.lastname !== this.lastname.value
            )
            this.itemsService.signalIsValid.set(this.userForm.valid)
            this.user.username = this.username.value
            this.user.firstname = this.firstname.value
            this.user.lastname = this.lastname.value
        })
    }

    initItem = (selectedIndex: number) => {
        if (selectedIndex === -1) {
            this.user = {
                id: 0,
                username: '',
                firstname: '',
                lastname: '',
                    }
        } else {
            this.user = {
                id: this.selectedItem.id,
                username: this.selectedItem.username,
                firstname: this.selectedItem.firstname,
                lastname: this.selectedItem.lastname,
            }    
        }
        this.initForm()
    }

}
