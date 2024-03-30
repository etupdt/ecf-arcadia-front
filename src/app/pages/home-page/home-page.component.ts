import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/interfaces/Habitat';
import { Service } from 'src/app/interfaces/Service';
import { View } from 'src/app/interfaces/View';
import { HabitatService } from 'src/app/services/habitat.service';
import { ServiceService } from 'src/app/services/service.service';
import { ViewService } from 'src/app/services/view.service';
import { ViewComponentComponent } from '../components/view-component/view-component.component';
import { ViewFormComponent } from '../components/view-form/view-form.component';
import { ServiceCardComponent } from '../components/service-card/service-card.component';
import { HabitatCardComponent } from '../components/habitat-card/habitat-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { HeaderService } from 'src/app/services/header.service';
import { Observable } from 'rxjs';
import { HabitatListComponent } from "../components/habitat-list/habitat-list.component";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    providers: [],
    imports: [NgFor, CommonModule, HabitatCardComponent, ServiceCardComponent, ViewFormComponent, ViewComponentComponent, HabitatListComponent]
})
export class HomePageComponent implements OnInit {

  constructor(
    private habitatService: HabitatService,
    private serviceService: ServiceService,
    private viewService: ViewService,
    private headerService: HeaderService
  ) { }

  habitats$: Observable<Habitat[]> = this.habitatService.getHabitats()
  services$: Observable<Service[]> = this.serviceService.getServices()
  views$: Observable<View[]> = this.viewService.getViews()

  view!: View

  ngOnInit(): void {

    this.headerService.selectedMenuItem = "Accueil"
    this.headerService.signalItemSelected.set('Accueil')

    this.view = this.initForm()

  }

  onFormSubmit = (view: View) => {

    this.viewService.postView(view).subscribe({
      next: (res: View[]) => {
        this.view = this.initForm()
      },
      error: (error: { error: { message: any; }; }) => {
        // this.dialog.open(MessageDialogComponent, {
        //   data: {
        //     type: 'Erreur',
        //     message1: `Erreur lors de la lecture des options`,
        //     message2: error.error.message,
        //     delai: 0
        //   }
        // })
      }
    })

  }

  initForm = (): View => {
    return {
      id : 0,
      pseudo : "",
      comment : "",
      isVisible : false
    }
  }

}
