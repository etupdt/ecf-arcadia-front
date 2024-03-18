import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/interfaces/Habitat';
import { HabitatService } from 'src/app/services/habitat.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private habitatService: HabitatService
  ) { }

  habitats: Habitat[] = []

  ngOnInit(): void {

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

  }

  habitats2 = [
    {
      name: 'Savane',
      description: 'Sec',
      comment: 'très sec',
      animals: [
        {
          firstname: 'Zouzou',
          health: 'Bonne',
          race: {
            label: 'Zébre'
          }
        }
      ],
      images: [
        {
          imageName: 'thomas-bennie-1jlJrr4XGkU-unsplash.jpg'
        }
      ]
    }
  ]

  services = [
    {
      name: 'Le Restaurant',
      description: 'Venez en famille vous régaler dans le restaurant du zoo.',
      images: [
        {
          imageName: 'pexels-photo-1307698.jpeg'
        }
      ]
    },
    {
      name: 'Visite des habitats',
      description: 'Un guide vous fera découvrir tous les habitats.',
      images: [
        {
          imageName: 'africa-animals-zoo-zebras.jpg'
        }
      ]
    },
    {
      name: 'Le petit train',
      description: 'Visitez, avec les enfants, tous les enclos du zoo en petit train.',
      images: [
        {
          imageName: 'free-photo-of-ete-building-batiment-immeuble.jpeg'
        }
      ]
    }
  ]

}
