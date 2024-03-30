import { Component, Input, signal } from '@angular/core';
import { Habitat } from 'src/app/interfaces/Habitat';
import { environment } from 'src/environments/environment';
import { NgFor } from '@angular/common';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { UniqReportPipe } from "../../pipes/uniq-report.pipe";

@Component({
    selector: 'app-habitat-card',
    templateUrl: './habitat-card.component.html',
    styleUrls: ['./habitat-card.component.scss'],
    standalone: true,
    imports: [NgFor, AnimalCardComponent, UniqReportPipe]
})
export class HabitatCardComponent {

    useBackendImages: string = `${environment.useBackendImages}`

    @Input() habitat!: Habitat

    collapse: boolean = true

}
