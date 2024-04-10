import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/interfaces/Animal';
import { VeterinaryReport } from 'src/app/interfaces/VeterinaryReport';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { ReportFilterPipe } from '../pipes/report-filter.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Dropdown } from 'src/app/interfaces/Dropdown';
import { AnimalFilterPipe } from "../pipes/animal-filter.pipe";

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReportFilterPipe, NgMultiSelectDropDownModule, AnimalFilterPipe]
})
export class ReportsPageComponent {

    constructor (
        private animalService: ApiService<Animal>,
        private headerService: HeaderService
    ) {}

    date: string = ""

    
    animalList!: Dropdown[]
    animalsSelected!: Dropdown[]
    
    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
    };
    
    animals$: Observable<Animal[]> = this.animalService.getItems('animals')

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')

        let animalList: Dropdown[] = []
        let animalsSelected: Dropdown[] = []

        this.animalService.getItems('animals').subscribe({
            next: ((res: Animal[]) => {
                res.forEach(animal => {
                    animalList.push({ 
                        id: animal.id, 
                        item_text: animal.firstname
                    })
                })
                this.animalList = animalList
                this.animalsSelected = animalsSelected
            })
        })
    
    }

}
