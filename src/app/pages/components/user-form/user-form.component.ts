import { NgIf } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { User } from 'src/app/models/User';
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
    set selectedItem(item: IUser) {this.itemsService.items[this.itemsService.selectedIndex]}

    get user() { return this.itemsService.updatedItem }
    set user(user : IUser) { this.itemsService.updatedItem = user }

    get username() { return this.userForm.get('username')! as FormControl }
    get firstname() { return this.userForm.get('firstname')! as FormControl }
    get lastname() { return this.userForm.get('lastname')! as FormControl }
    get role() { return this.userForm.get('role')! as FormControl }

    ngOnInit(): void {

        this.user = new User()
        
        this.initForm()
    
    }        

    initForm = () => {
        this.userForm = new FormGroup({
            username: new FormControl(this.user.username, Validators.required),
            firstname: new FormControl(this.user.firstname, Validators.required),
            lastname: new FormControl(this.user.lastname, Validators.required),
            role: new FormControl(this.user.role, Validators.required),
        });    
        this.userForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.user.username !== this.username.value ||
                this.user.firstname !== this.firstname.value ||
                this.user.lastname !== this.lastname.value ||
                this.user.role !== this.role.value
            )
            this.itemsService.signalIsValid.set(this.userForm.valid)
            this.user.username = this.username.value
            this.user.firstname = this.firstname.value
            this.user.lastname = this.lastname.value
            this.user.role = this.role.value
        })
    }

    initItem = (selectedIndex: number) => {
        if (selectedIndex === -1) {
            this.user = new User()
            console.log('user', this.user)
        } else {
            this.user = new User(this.selectedItem.id, 
                this.selectedItem.username, 
                this.selectedItem.firstname, 
                this.selectedItem.lastname,
                this.selectedItem.role
            )
        }
        this.initForm()
    }

}
