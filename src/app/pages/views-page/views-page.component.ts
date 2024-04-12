import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewFormComponent } from '../components/view-form/view-form.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';
import { ApiService } from 'src/app/services/api.service';
import { IView } from 'src/app/interfaces/IView';

@Component({
  selector: 'app-views-page',
  templateUrl: './views-page.component.html',
  styleUrls: ['./views-page.component.scss'],
  standalone: true,
  imports: [NgFor, CommonModule, ViewFormComponent, FormsModule]

})
export class ViewsPageComponent implements OnInit{

    constructor (
        private viewService: ApiService<IView>,
        private headerService: HeaderService
    ) {}

    views$: Observable<IView[]> = this.viewService.getItems('views')

    fields: (keyof IView)[] = ['id', 'comment', 'isVisible']
    
    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    
    }

    update(view: IView): void {

        view.isVisible = !view.isVisible

        this.viewService.putItem('views', view.id, view).subscribe({
            next: (res) => {
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })

    }

}
