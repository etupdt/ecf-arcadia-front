import { Component, effect, Input, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgFor } from '@angular/common';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { UniqReportPipe } from "../../pipes/uniq-report.pipe";
import { IHabitat } from 'src/app/interfaces/IHabitat';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-habitat-card',
    templateUrl: './habitat-card.component.html',
    styleUrls: ['./habitat-card.component.scss'],
    standalone: true,
    imports: [NgFor, AnimalCardComponent, UniqReportPipe]
})
export class HabitatCardComponent {

    useBackendImages: string = `${environment.useBackendImages}`

    @Input() habitat!: IHabitat

    constructor (
        public headerService: HeaderService,
    ) {
        effect(() => {
            const idNotCollapse = this.headerService.signalCollapseHabitats()
        });
    }

    toggleCollapse = () => {
        if (this.headerService.collapseHabitats !== this.habitat.id) {
            this.headerService.collapseHabitats = this.habitat.id
            this.headerService.signalCollapseHabitats.set(this.habitat.id)
        } else {
            this.headerService.collapseHabitats = 0
            this.headerService.signalCollapseHabitats.set(0)
        }
        // this.collapse = !this.collapse
    }

    get collapse() {return this.headerService.collapseHabitats === this.habitat.id}

}
