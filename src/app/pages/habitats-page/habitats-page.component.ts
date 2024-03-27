import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HabitatCardComponent } from "../components/habitat-card/habitat-card.component";
import { HabitatService } from 'src/app/services/habitat.service';
import { HeaderService } from 'src/app/services/header.service';
import { Observable } from 'rxjs';
import { Habitat } from 'src/app/interfaces/Habitat';
import { HabitatListComponent } from "../components/habitat-list/habitat-list.component";

@Component({
    selector: 'app-habitats-page',
    templateUrl: './habitats-page.component.html',
    styleUrls: ['./habitats-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, HabitatCardComponent, HabitatCardComponent]
})
export class HabitatsPageComponent {

  habitats$: Observable<Habitat[]> = this.habitatService.getHabitats()

  constructor(
    private habitatService: HabitatService,
    private headerService: HeaderService,
  ) { }  

  ngOnInit(): void {

    this.headerService.selectedMenuItem = "Habitats"
    this.headerService.signalItemSelected.set('Habitats')

  }

}
