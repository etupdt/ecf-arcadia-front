import { CommonModule, NgFor } from '@angular/common';
import { Component, Injector, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HeaderService } from 'src/app/services/header.service';
import { ListComponent } from "../components/list/list.component";

@Component({
    selector: 'app-crud-page',
    templateUrl: './crud-page.component.html',
    styleUrls: ['./crud-page.component.scss'],
    standalone: true,
    imports: [NgFor, CommonModule, RouterOutlet, RouterModule, ListComponent]
})
export class CrudPageComponent<Tdata> implements OnInit {

    private genericService: any

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private injector: Injector,
        private headerService: HeaderService,
        private apiService: ApiService<Tdata>
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        this.router.navigate([{ outlets: { list: [ 'list' ] }}], {relativeTo:this.route})
        .then(ok => this.router.navigate([{ outlets: { form: [ 'form' ] }}], {relativeTo:this.route}))
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
        });
    }
    
    uri: string = this.route.snapshot.data['feature']
    
    get items(): Tdata[] {return this.genericService.items}
    
    get selectedIndex(): number {return this.genericService.selectedIndex}
    set selectedIndex(index: number) {
        this.inCreation = -1
        this.genericService.signalIsUpdated.set(false)
        this.genericService.selectedIndex = index
        this.genericService.signalSelectedIndex.set(index)
    }    
    
    isUpdated: boolean = false
    isValid: boolean = false
    
    inCreation: number = -1
    
    ngOnInit(): void {
        
        this.headerService.selectedMenuItem = "Admin"
        this.headerService.signalItemSelected.set('Admin')
    }

    create = () => {
        const temp = this.selectedIndex
        this.selectedIndex = -1
        this.inCreation = temp
    }
    
    update = () => {
        console.log(this.genericService.items, this.uri)
        if (this.genericService.updatedItem['id'] === 0) {
            this.apiService.postItem(this.uri, this.genericService.updatedItem).subscribe({
                next: (res: Tdata) => {
                    console.log(res)
                    this.items.push(res)
                    this.selectedIndex = this.items.length - 1
                    this.genericService.updatedItem['id'] = this.genericService.items[this.selectedIndex]['id']
                },    
                error: (error: { error: { message: any; }; }) => {
                    this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                    this.headerService.signalModal.set(this.headerService.modal)
                }    
            })    
        } else {
            this.apiService.putItem(this.uri, this.genericService.updatedItem['id'], this.genericService.updatedItem).subscribe({
                next: (res: Tdata) => {
                    this.items[this.selectedIndex] = res
                    this.selectedIndex = this.selectedIndex
                },    
                error: (error: { error: { message: any; }; }) => {
                    this.headerService.modal = {modal: 'error', message: error.error.message, display: "display: block;"}
                    this.headerService.signalModal.set(this.headerService.modal)
                }    
            })    
        }    
    }    

    cancel = () => {
        if (this.inCreation !== -1) {
            this.selectedIndex = this.inCreation
        } else {
            this.genericService.isUpdatedItem++
            this.genericService.signalIsUpdatedItem.set(this.genericService.isUpdatedItem)
            this.selectedIndex = this.selectedIndex
        }
    }

}
