import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewFormComponent } from '../../components/view-form/view-form.component';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeaderService } from 'src/app/services/header.service';
import { ApiService } from 'src/app/services/api.service';
import { IView } from 'src/app/interfaces/IView';
import { View } from 'src/app/models/View';
import { ActivatedRoute } from '@angular/router';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-views-page',
  templateUrl: './views-page.component.html',
  styleUrls: ['./views-page.component.scss'],
  standalone: true,
  imports: [NgFor, CommonModule, ViewFormComponent, FormsModule]

})
export class ViewsPageComponent implements OnInit{

    constructor (
        private authService: AuthService,
        private viewService: ApiService<View>,
        private route: ActivatedRoute,
        private headerService: HeaderService,
        private modalService: NgbModal
    ) {}

    views$: Observable<View[]> = this.viewService.getItems('views')

    fields: (keyof IView)[] = ['id', 'comment', 'isVisible']
    
    ngOnInit(): void {

        this.headerService.selectedMenuItem =  this.authService.user.role
        this.headerService.signalItemSelected.set( this.authService.user.role)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(path ? path : '')

    }

    update(view: View): void {

        view.isVisible = !view.isVisible

        this.viewService.putItem('views', view.id, new View(view.id, view.pseudo, view.comment, view.isVisible)).subscribe({
            next: (res) => {
            },
            error: (error: { error: { message: any; }; }) => {
                const modal = this.modalService.open(ErrorModalComponent)
                modal.componentInstance.message = error.error.message;
        }
        })

    }

}
