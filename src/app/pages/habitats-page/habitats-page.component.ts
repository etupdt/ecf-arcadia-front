import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HabitatCardComponent } from "../components/habitat-card/habitat-card.component";
import { HeaderService } from 'src/app/services/header.service';
import { Observable } from 'rxjs';
import { IHabitat } from 'src/app/interfaces/IHabitat';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-habitats-page',
    templateUrl: './habitats-page.component.html',
    styleUrls: ['./habitats-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, HabitatCardComponent, HabitatCardComponent]
})
export class HabitatsPageComponent {

    habitats$: Observable<IHabitat[]> = this.habitatService.getItems('habitats')

    constructor(
        private habitatService: ApiService<IHabitat>,
        private headerService: HeaderService,
    ) { }  

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Habitats"
        this.headerService.signalItemSelected.set('Habitats')
        this.headerService.selectedSubMenuItem = ''
        this.headerService.signalSubItemSelected.set('')

    }

}
