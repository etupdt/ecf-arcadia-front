import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hours } from 'src/app/interfaces/Hours';
import { ApiService } from 'src/app/services/api.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class HoursComponent implements OnInit {

    constructor (
        private hoursService: ApiService<Hours>
    ) {}
    
    hours!: Hours[]
    
    ngOnInit(): void {
        this.hoursService.getItems('hours').subscribe({
            next: (res: Hours[]) => {
                this.hours = res
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
        
    }

}
