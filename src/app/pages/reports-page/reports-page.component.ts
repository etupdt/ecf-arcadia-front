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
import { ActivatedRoute } from '@angular/router';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
        private route: ActivatedRoute,
        private headerService: HeaderService,
        private modalService: NgbModal
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

        this.headerService.selectedMenuItem =  this.headerService.user.role
        this.headerService.signalItemSelected.set( this.headerService.user.role)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(path ? path : '')

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
                const modal = this.modalService.open(ErrorModalComponent)
                modal.componentInstance.message = error.error.message;
        }
        })
    
    }

}
