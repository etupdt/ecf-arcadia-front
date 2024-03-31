import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { View } from 'src/app/interfaces/View';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewService } from 'src/app/services/view.service';

@Component({
    selector: 'app-view-form',
    templateUrl: './view-form.component.html',
    styleUrls: ['./view-form.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class ViewFormComponent implements OnInit {

    constructor (
        private viewService: ViewService
    ) {}

    @Input() view!: View
    @Input() updatable: Boolean = false

    @Output() return: EventEmitter<View> = new EventEmitter()
    
    viewForm!: FormGroup

    updated: boolean = false

    ngOnInit(): void {
        this.viewForm = new FormGroup({
            pseudo: new FormControl(this.view.pseudo, Validators.required),
            comment: new FormControl(this.view.comment, Validators.required),
        });    
        if (!this.updatable) {
            this.pseudo.disable()
            this.comment.disable()
        }
        this.viewForm.valueChanges.subscribe(change => {
            this.updated = this.isUpdated()
        })        

    }        

    save(): void {

        this.view.pseudo = this.pseudo.value
        this.view.comment = this.comment.value

        this.viewService.putView(this.view).subscribe({
            next: (res) => {
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
