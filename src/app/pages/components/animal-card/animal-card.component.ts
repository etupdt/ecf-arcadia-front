import { Component, EventEmitter, Input, Output, effect } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  standalone: true
})
export class AnimalCardComponent {

  constructor (
    private headerService: HeaderService
  ) {
    effect(() => {
        console.log("effect", this.headerService.signalCollapseAnimals())
        if (this.animal && this.animal.id !== this.headerService.signalCollapseAnimals()) {
            console.log("effect2")
            this.collapse = true
        }
    });
}

    useBackendImages: string = `${environment.useBackendImages}`

    @Input() animal!: Animal

    collapse: boolean = true;

    toggleCollapse = () => {
        if (this.collapse) {
            this.headerService.collapseAnimals = this.animal.id
            this.headerService.signalCollapseAnimals.set(this.animal.id)
        }
        this.collapse = !this.collapse
    }

}
