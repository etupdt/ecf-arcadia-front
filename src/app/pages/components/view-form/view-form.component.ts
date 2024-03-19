import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

    viewForm!: FormGroup

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {

        this.viewForm = this.formBuilder.group({
            pseudo: [
                ""
            ],
            view: [
                ""
            ],
        }
      
    )}

}
