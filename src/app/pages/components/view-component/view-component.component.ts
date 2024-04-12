import { Component, Input } from '@angular/core';
import { View } from 'src/app/models/View copy';

@Component({
    selector: 'app-view-component',
    templateUrl: './view-component.component.html',
    styleUrls: ['./view-component.component.scss'],
    standalone: true
})
export class ViewComponentComponent {

  @Input() view : View = new View (0, '', '', false)

}
