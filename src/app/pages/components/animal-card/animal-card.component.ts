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

    @Input() animal!: Animal

    collapse: boolean = false;

}
