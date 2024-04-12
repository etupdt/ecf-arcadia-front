import { Component, EventEmitter, Input, Output, effect } from '@angular/core';
import { IAnimal } from 'src/app/interfaces/IAnimal';
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
        const idNotCollapse = this.headerService.signalCollapseAnimals()
        if (this.animal && this.animal.id !== idNotCollapse) {
            this.collapse = true
        }
    });
}

    useBackendImages: string = `${environment.useBackendImages}`

    @Input() animal!: IAnimal

    collapse: boolean = true;

    toggleCollapse = () => {
        if (this.collapse) {
            this.headerService.collapseAnimals = this.animal.id
            this.headerService.signalCollapseAnimals.set(this.animal.id)
        }
        this.collapse = !this.collapse
    }

}
