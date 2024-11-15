import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IView } from 'src/app/interfaces/IView';
import { View } from 'src/app/models/View';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-view-form',
    templateUrl: './view-form.component.html',
    styleUrls: ['./view-form.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, ReactiveFormsModule]
})
export class ViewFormComponent implements OnInit {

    constructor (
        private viewService: ApiService<IView>
    ) {}

    @Input() view!: IView
    @Input() updatable: Boolean = false

    @Output() return: EventEmitter<IView> = new EventEmitter()
    
    viewForm!: FormGroup

    updated: boolean = false

    ngOnInit(): void {
        this.initForm()
    }        

    initForm(): void {
        this.viewForm = new FormGroup({
            pseudo: new FormControl(this.view.pseudo, [
                Validators.required, 
                Validators.minLength(3),
                Validators.pattern(/^[a-zA-Z0-9]/)
            ]),
            comment: new FormControl(this.view.comment, Validators.required),
            isVisible: new FormControl(this.view.isVisible, Validators.required),
        });    
        if (!this.updatable) {
            this.pseudo.disable()
            this.comment.disable()
        }
        this.viewForm.valueChanges.subscribe(change => {
            this.updated = this.isUpdated()
        })        
    }        

    update(): void {

        this.view.pseudo = this.pseudo.value
        this.view.comment = this.comment.value
        this.view.isVisible = false

        this.viewService.postItem('views', this.view).subscribe({
            next: (res) => {
                this.view = new View(0, "", "", false)
                this.initForm()
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
    
    }

    isUpdated = () => {
        return this.view.pseudo !== this.pseudo.value ||
               this.view.comment !== this.comment.value
    }

    get pseudo() { return this.viewForm.get('pseudo')! as FormControl }
    get comment() { return this.viewForm.get('comment')! as FormControl }

}
