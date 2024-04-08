import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewFormComponent } from '../components/view-form/view-form.component';
import { Observable } from 'rxjs';
import { View } from 'src/app/interfaces/View';
import { ItemsService } from 'src/app/services/items.service';
import { Service } from 'src/app/interfaces/Service';
import { ViewService } from 'src/app/services/view.service';
import { FormsModule, NgModel } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-views-page',
  templateUrl: './views-page.component.html',
  styleUrls: ['./views-page.component.scss'],
  standalone: true,
  imports: [NgFor, CommonModule, ViewFormComponent, FormsModule]

})
export class ViewsPageComponent implements OnInit{

    constructor (
        private itemsService: ApiService<View>,
        private headerService: HeaderService
    ) {}

    views$: Observable<View[]> = this.itemsService.getItems('views')

    fields: (keyof View)[] = ['id', 'comment', 'isVisible']
    
    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    
    }

    update(view: View): void {

        view.isVisible = !view.isVisible

        this.itemsService.putItem('views', view.id, view).subscribe({
            next: (res) => {
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

}
