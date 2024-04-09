import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule]
  
})
export class ReportsPageComponent {

    constructor (
        private itemsService: ApiService<VeterinaryReport>,
        private headerService: HeaderService
    ) {}

    veterinaryReports$: Observable<VeterinaryReport[]> = this.itemsService.getItems('veterinaryreports')

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    
    }

}
