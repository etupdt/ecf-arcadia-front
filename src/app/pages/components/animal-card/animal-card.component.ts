import { Component, Input } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  standalone: true
})
export class AnimalCardComponent {

  useBackendImages: string = `${environment.useBackendImages}`

  @Input() animal : Animal = {
    id: 0,
    firstname: "",
    images: [
      {
        id: 0,
        imageName: ""
      }
    ],
    health: '',
    race: {
      id: 0,
      label: ''
    }
  }

}
