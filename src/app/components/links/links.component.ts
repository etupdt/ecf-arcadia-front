import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  standalone: true,
  imports: [RouterModule]
})
export class LinksComponent {

    @Input() selectedItem!: string

}
