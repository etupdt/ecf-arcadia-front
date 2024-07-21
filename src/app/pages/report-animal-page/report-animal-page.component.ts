import { DatePipe } from '@angular/common';
import { Component, HostListener, Injector, OnDestroy, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { AnimalFoodComponent } from '../../components/animal-food/animal-food.component';
import { FormsModule } from '@angular/forms';
import { Animal } from 'src/app/models/Animal';
import { VeterinaryReport } from 'src/app/models/VeterinaryReport';

@Component({
  selector: 'app-veterinary-page',
  templateUrl: './report-animal-page.component.html',
  styleUrls: ['./report-animal-page.component.scss'],
  standalone: true,
  imports: [AnimalFoodComponent, FormsModule, RouterOutlet]
})
export class ReportAnimalPageComponent implements OnInit {

    private genericService: any

    constructor (
        private headerService: HeaderService,
        private animalService: ApiService<Animal>,
        private injector: Injector,
        private veterinaryReportService: ApiService<VeterinaryReport>,
        private router: Router,
        private route: ActivatedRoute,
        public datepipe: DatePipe
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        this.router.navigate([{ outlets: { list: [ 'list' ] }}], {relativeTo:this.route})
        .then(ok => this.router.navigate([{ outlets: { form: [ 'form' ] }}], {relativeTo:this.route}))
        .then(ok => this.router.navigate([{ outlets: { food: [ 'food' ] }}], {relativeTo:this.route}))
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
        });
    }

    uri: string = 'veterinaryreports'
    
    get items(): Animal[] {return this.genericService.items}
    
    get updatedItem(): VeterinaryReport {return this.genericService.updatedItem}

    get selectedIndex(): number {return this.genericService.selectedIndex}
    set selectedIndex(index: number) {
        this.inCreation = false
        this.genericService.signalIsUpdated.set(false)
        this.genericService.selectedIndex = index
        this.genericService.signalSelectedIndex.set(index)
    }    

    isUpdated: boolean = false
    isValid: boolean = false
    
    inCreation: boolean = false
    
    veterinaryReportIndex: number = -1

    ngOnInit(): void {
        this.headerService.selectedMenuItem =  this.headerService.user.role
        this.headerService.signalItemSelected.set( this.headerService.user.role)
        const path = this.route.snapshot.routeConfig ? this.route.snapshot.routeConfig.path : ''
        this.headerService.selectedSubMenuItem = path ? path : ''
        this.headerService.signalSubItemSelected.set(path ? path : '')
    }

    create = () => {
    }
    
    update = () => {

        if (this.updatedItem.id === 0) {
            this.veterinaryReportService.postItem('veterinaryreports', this.updatedItem).subscribe({
                next: (res: VeterinaryReport) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].veterinaryReports!.push(res)
                },
                error: (error: { error: { message: any; }; }) => {
                    this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                    this.headerService.signalModal.set(this.headerService.modal)
                }
            })
        } else {

            this.veterinaryReportService.putItem('veterinaryreports', this.updatedItem.id, this.updatedItem).subscribe({
                next: (res: VeterinaryReport) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].veterinaryReports![this.veterinaryReportIndex] = res
                },
                error: (error: { error: { message: any; }; }) => {
                    this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                    this.headerService.signalModal.set(this.headerService.modal)
                }
            })
        }

    }

    cancel = () => {
        this.genericService.isUpdatedItem++
        this.genericService.signalIsUpdatedItem.set(this.genericService.isUpdatedItem)
        this.selectedIndex = this.selectedIndex
    }

}
