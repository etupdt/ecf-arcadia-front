import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Habitat } from 'src/app/interfaces/Habitat';
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

  @Input() habitat!: Habitat

}
