import { Component, Input } from '@angular/core';
import { View } from 'src/app/interfaces/View';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.scss']
})
export class ViewComponentComponent {

  @Input() view : View = {
    id: 0,
    pseudo: "",
    comment: "",
    isVisible: false
  }

}
