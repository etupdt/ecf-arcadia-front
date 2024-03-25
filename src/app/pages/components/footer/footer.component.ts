import { Component } from '@angular/core';
import { HoursComponent } from '../hours/hours.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [HoursComponent]
})
export class FooterComponent {

}
