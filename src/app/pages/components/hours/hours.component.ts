import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hours } from 'src/app/models/Hours';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
  standalone: true,
  imports: [NgIf, CommonModule]
})
export class HoursComponent {

    constructor (
        private hoursService: ApiService<Hours>
    ) {}
    
    hours$: Observable<Hours[]> = this.hoursService.getItems('hours')

}
