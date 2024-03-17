import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habitat-card',
  templateUrl: './habitat-card.component.html',
  styleUrls: ['./habitat-card.component.scss']
})
export class HabitatCardComponent {

  useBackendImages: string = `${environment.useBackendImages}`

  @Input() habitat! : any

}
