import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { FiltersPipe } from '../pipes/filters.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, FiltersPipe, NgMultiSelectDropDownModule]
  
})
export class ReportsPageComponent {

    constructor (
        private veterinaryReportService: ApiService<VeterinaryReport>,
        private animalService: ApiService<Animal>,
        private headerService: HeaderService
    ) {}

    date: string = ""

    animalList: {
        item_id: number, 
        item_text: string
    }[] = []

    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 4,
        allowSearchFilter: true
    };

    selectedItems = []
  
    veterinaryReports$: Observable<VeterinaryReport[]> = this.veterinaryReportService.getItems('veterinaryreports')

    animals$: Observable<Animal[]> = this.animalService.getItems('animals')

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')

        this.animals$.subscribe({
            next: ((res: Animal[]) => {
                res.forEach(animal => this.animalList.push({ 
                    item_id: animal.id, 
                    item_text: animal.firstname
                }))
            })
        })
    
    }

}
