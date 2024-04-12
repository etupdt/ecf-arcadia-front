import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IHabitat } from 'src/app/interfaces/IHabitat';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-habitat-list',
  templateUrl: './habitat-list.component.html',
  styleUrls: ['./habitat-list.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class HabitatListComponent {

  useBackendImages: string = `${environment.useBackendImages}`

  @Input() habitat!: IHabitat

}
