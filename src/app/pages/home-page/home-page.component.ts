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

}
