import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/interfaces/Habitat';
import { Service } from 'src/app/interfaces/Service';
import { View } from 'src/app/interfaces/View';
import { HabitatService } from 'src/app/services/habitat.service';
import { ServiceService } from 'src/app/services/service.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private habitatService: HabitatService,
    private serviceService: ServiceService,
    private viewService: ViewService
  ) { }

  habitats: Habitat[] = []

  services: Service[] = []

  view!: View

  views: View[] = []

  ngOnInit(): void {

    this.view = this.initForm()

    this.habitatService.getHabitats().subscribe({
      next: (res: Habitat[]) => {
        this.habitats = res
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

    this.serviceService.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = res
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

    this.viewService.getViews().subscribe({
      next: (res: View[]) => {
        this.views = res
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

  onFormSubmit = (view: View) => {

    this.viewService.postView(view).subscribe({
      next: (res: View[]) => {
        this.view = this.initForm()
        console.log(res)
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
