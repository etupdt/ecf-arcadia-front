import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { ReportFilterPipe } from '../../pipes/report-filter.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AnimalFilterPipe } from "../../pipes/animal-filter.pipe";
import { IDropdown } from 'src/app/interfaces/IDropdown';
import { IAnimal } from 'src/app/interfaces/IAnimal';

@Component({
    selector: 'app-reports-page',
    templateUrl: './reports-page.component.html',
    styleUrls: ['./reports-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReportFilterPipe, NgMultiSelectDropDownModule, AnimalFilterPipe]
})
export class ReportsPageComponent {

    constructor (
        private animalService: ApiService<IAnimal>,
        private headerService: HeaderService
    ) {}

    date: string = ""

    
    animalList!: IDropdown[]
    animalsSelected!: IDropdown[]
    
    dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
    };
    
    animals$: Observable<IAnimal[]> = this.animalService.getItems('animals')

    ngOnInit(): void {

        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')

        let animalList: IDropdown[] = []
        let animalsSelected: IDropdown[] = []

        this.animalService.getItems('animals').subscribe({
            next: (res: IAnimal[]) => {
                res.forEach(animal => {
                    animalList.push({ 
                        id: animal.id, 
                        item_text: animal.firstname
                    })
                })
                this.animalList = animalList
                this.animalsSelected = animalsSelected
            },
            error: (error: { error: { message: any; }; }) => {
                this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                this.headerService.signalModal.set(this.headerService.modal)
            }
        })
    
    }

}
