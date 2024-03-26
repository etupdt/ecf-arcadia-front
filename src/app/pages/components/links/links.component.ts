import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  standalone: true
})
export class LinksComponent {

    @Input() selectedItem!: string

}
