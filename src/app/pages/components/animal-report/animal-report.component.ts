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

@Component({
    selector: 'app-animal-report',
    templateUrl: './animal-report.component.html',
    styleUrls: ['./animal-report.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AnimalReportComponent {

    useBackendImages: string = `${environment.useBackendImages}`

    animalForm!: FormGroup

    private itemsService: any

    constructor (
        private injector: Injector,
        private route: ActivatedRoute,
        private headerService: HeaderService,
        private foodService: ApiService<Food>,
        public datepipe: DatePipe
    ) {
        this.itemsService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            if (this.itemsService.signalIsUpdatedItem()) {
                this.onChangeDateFood()
            }
        })
        effect(() => {
            if (this.itemsService.signalSelectedIndex() !== null) {
                this.onChangeDateFood()
            }
        })
    }

    date: string | null = this.datepipe.transform(Date.now(), 'y-MM-dd')
    foods$: Observable<Food[]> = this.foodService.getItems('foods')
    
    get selectedItem(): Animal { return this.itemsService.items[this.itemsService.selectedIndex]}
    set selectedItem(item: Animal) {this.itemsService.items[this.itemsService.selectedIndex]}

    get veterinaryReport() { return this.itemsService.updatedItem }
    set veterinaryReport(veterinaryReport : VeterinaryReport) { this.itemsService.updatedItem = veterinaryReport }
    
    get detail() { return this.animalForm.get('detail')! as FormControl }
    get gramage() { return this.animalForm.get('gramage')! as FormControl }
    get food() { return this.animalForm.get('food')! as FormControl }
    
    veterinaryReportIndex: number = -1
    
    initForm = () => {
        this.animalForm = new FormGroup({
            food: new FormControl(this.veterinaryReport.food.id, Validators.required),
            detail: new FormControl(this.veterinaryReport.detail),
            gramage: new FormControl(
                this.veterinaryReport.gramage === 0 ? '' : this.veterinaryReport.gramage,
                Validators.required
            )
        })
        this.animalForm.valueChanges.subscribe(changes => { 
            this.itemsService.signalIsUpdated.set(
                this.veterinaryReport.detail !== this.detail.value ||
                (this.veterinaryReport.gramage === 0 ? '' : this.veterinaryReport.gramage) !== this.gramage.value ||
                this.veterinaryReport.food.id !== this.food.value 
            )
            this.itemsService.signalIsValid.set(this.animalForm.valid && this.food.value !== 0)
            this.veterinaryReport.date = this.date!
            this.veterinaryReport.detail = this.detail.value
            this.veterinaryReport.gramage = this.gramage.value
            this.veterinaryReport.food.id = this.food.value
            this.veterinaryReport.animal.id = this.selectedItem.id
            this.veterinaryReport.user = this.headerService.user
        })
    }

    getVeterinaryReport(date: string): VeterinaryReport | undefined {

        return this.selectedItem.veterinaryReports!.find((f: VeterinaryReport) => {
            return f.date === date
        })
        
    }

    onChangeDateFood = () => {

        const veterinaryReport = this.getVeterinaryReport(this.date!)

        if (veterinaryReport) {
            this.veterinaryReport = new VeterinaryReport (
                veterinaryReport.id,
                veterinaryReport.date,
                veterinaryReport.detail,
                veterinaryReport.gramage,
                this.selectedItem,
                this.headerService.user,
                veterinaryReport.food
            )

        } else {

            this.veterinaryReport = new VeterinaryReport()
        }

        this.initForm()

    }

}
