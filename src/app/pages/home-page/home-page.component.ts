import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  habitats = [
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
