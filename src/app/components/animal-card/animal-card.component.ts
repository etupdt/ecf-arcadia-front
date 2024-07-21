import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect } from '@angular/core';
import { IAnimal } from 'src/app/interfaces/IAnimal';
import { Animal } from 'src/app/models/Animal';
import { AnimalStatistic } from 'src/app/models/AnimalStatistic';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  standalone: true
})
export class AnimalCardComponent {

    now = this.datepipe.transform(Date.now(), 'y-MM-dd')

    constructor (
        private headerService: HeaderService,
        private animalService: ApiService<Animal>,
        public datepipe: DatePipe
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
            this.setStatistics()
        }
        this.collapse = !this.collapse
    }

    private setStatistics() {
        this.animalService.postItem('animals/statistics', new AnimalStatistic(
            this.animal.firstname, 
            this.now ? this.now : '',
             1
        )).subscribe({
            next: (res: any) => {},
            error: (error: { error: { message: any; }; }) => {
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            }    
        })
    }
    
}
