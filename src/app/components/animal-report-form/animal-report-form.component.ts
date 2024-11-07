import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, Injector, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/Animal';
import { Food } from 'src/app/models/Food';
import { VeterinaryReport } from 'src/app/models/VeterinaryReport';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from 'src/environments/environment';
import { AnimalFoodListComponent } from "../animal-food-list/animal-food-list.component";
import { FoodAnimal } from 'src/app/models/FoodAnimal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-animal-report-form',
    templateUrl: './animal-report-form.component.html',
    styleUrls: ['./animal-report-form.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule, AnimalFoodListComponent]
})
export class AnimalReportFormComponent {

    useBackendImages: string = `${environment.useBackendImages}`
    
    dateReport: string | null = this.datepipe.transform(Date.now(), 'y-MM-dd')
    foods$: Observable<Food[]> = this.foodService.getItems('foods')

    animalReportForm!: FormGroup

    private itemsService: any
    
    constructor (

        private injector: Injector,
        private route: ActivatedRoute,
        private authService: AuthService,
        private foodService: ApiService<Food>,
        public datepipe: DatePipe
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            if (this.itemsService.signalIsUpdatedItem()) {
                if (this.itemsService.selectedIndex !== -1) {
                    this.dateReport = this.datepipe.transform(Date.now(), 'y-MM-dd')!
                    this.onChangeDateReport()
                }    
            }    
        })    
    }    

    get selectedItem(): Animal { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Animal) {this.itemsService.items[this.itemsService.selectedIndex]}

    get veterinaryReport() { return this.itemsService.updatedItem }
    set veterinaryReport(veterinaryReport : VeterinaryReport) { this.itemsService.updatedItem = veterinaryReport }
    
    get detail() { return this.animalReportForm.get('detail')! as FormControl }
    get gramage() { return this.animalReportForm.get('gramage')! as FormControl }
    get food() { return this.animalReportForm.get('food')! as FormControl }
    
    veterinaryReportIndex: number = -1
    
    initForm = () => {
        console.log(this.selectedItem.id, this.veterinaryReport)
        this.animalReportForm = new FormGroup({
            food: new FormControl(this.veterinaryReport.food.id, Validators.required),
            detail: new FormControl(this.veterinaryReport.detail),
            gramage: new FormControl(
                this.veterinaryReport.gramage === 0 ? '' : this.veterinaryReport.gramage,
                Validators.required
            )
        })
        this.animalReportForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.veterinaryReport.detail !== this.detail.value ||
                (this.veterinaryReport.gramage === 0 ? '' : this.veterinaryReport.gramage) !== this.gramage.value ||
                this.veterinaryReport.food.id !== this.food.value 
            )
            this.itemsService.signalIsValid.set(this.animalReportForm.valid && this.food.value !== 0)
            this.veterinaryReport.date = this.dateReport!
            this.veterinaryReport.detail = this.detail.value
            this.veterinaryReport.gramage = this.gramage.value === '' ? 0 : this.gramage.value
            this.veterinaryReport.food.id = this.food.value
            this.veterinaryReport.animal = this.selectedItem
            this.veterinaryReport.user = this.authService.user
        })
    }

    getVeterinaryReport(date: string): number {

        return this.selectedItem.veterinaryReports!.findIndex((f: VeterinaryReport) => {
            return f.date === this.dateReport
        })
        
    }

    onChangeDateReport = () => {

        this.itemsService.subSelectedIndex = this.getVeterinaryReport(this.dateReport!)

        if (this.itemsService.subSelectedIndex === -1) {
            this.selectedItem.veterinaryReports.push(new VeterinaryReport())
            this.itemsService.subSelectedIndex = this.selectedItem.veterinaryReports.length - 1
        } 
        this.veterinaryReport = this.selectedItem.veterinaryReports[this.itemsService.subSelectedIndex]

        this.initForm()

    }

}
