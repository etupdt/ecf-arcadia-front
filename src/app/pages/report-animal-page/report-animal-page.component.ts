import { DatePipe, NgIf } from '@angular/common';
import { Component, HostListener, Injector, OnDestroy, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { AnimalFoodFormComponent } from '../../components/animal-food-form/animal-food-form.component';
import { FormsModule } from '@angular/forms';
import { Animal } from 'src/app/models/Animal';
import { VeterinaryReport } from 'src/app/models/VeterinaryReport';
import { ErrorModalComponent } from 'src/app/modals/error-modal/error-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimalFoodListComponent } from "../../components/animal-food-list/animal-food-list.component";
import { ToastsService } from 'src/app/services/toasts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-veterinary-page',
  templateUrl: './report-animal-page.component.html',
  styleUrls: ['./report-animal-page.component.scss'],
  standalone: true,
  imports: [AnimalFoodFormComponent, FormsModule, RouterOutlet, NgIf, AnimalFoodListComponent]
})
export class ReportAnimalPageComponent implements OnInit {

    private genericService: any

    constructor (
        private headerService: HeaderService,
        private authService: AuthService,
        private injector: Injector,
        private veterinaryReportService: ApiService<VeterinaryReport>,
        private router: Router,
        private route: ActivatedRoute,
        public datepipe: DatePipe,
        public toastsService: ToastsService,
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
        this.headerService.selectedMenuItem =  this.authService.user.role
        this.headerService.signalItemSelected.set( this.authService.user.role)
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
                    this.updatedItem.id = res.id
                    this.toastsService.show('l\'element a bien été créé !', 2000)
                },
                error: (error: { error: { message: any; }; }) => {
                }
            })
        } else {

            this.veterinaryReportService.putItem('veterinaryreports', this.updatedItem.id, this.updatedItem).subscribe({
                next: (res: VeterinaryReport) => {
                    this.genericService.signalIsUpdated.set(false)
                    this.items[this.selectedIndex].veterinaryReports![this.veterinaryReportIndex] = res
                    this.toastsService.show('l\'element a bien été modifié !', 2000)
                },
                error: (error: { error: { message: any; }; }) => {
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
