import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { View } from 'src/app/interfaces/View';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent {

    isUnChanged : boolean = true
    
    initForm = (): View => {
        return {
          id : 0,
          pseudo : "",
          comment : "",
          isVisible : false
        }
    }
    
    @Input() view: View = this.initForm()
    
    @Output() return: EventEmitter<View> = new EventEmitter()
    
    save(): void {
        if (!this.isUnChanged) {
            this.return.emit(this.view)
            this.view = this.initForm()
        }
    }

    change () {
        this.isUnChanged = (this.view.pseudo === "" || this.view.comment === "")
    }

}
