import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, Injector, Input, OnInit, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss'],
  standalone: true,
  imports: [NgFor, CommonModule, RouterOutlet, RouterModule]
})
export class CrudPageComponent<Tdata> implements OnInit {

    private genericService: any

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private injector: Injector,
        private cdRef:ChangeDetectorRef
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
        effect(() => {
            this.isUpdated = this.genericService.signalIsUpdated()
            this.isValid = this.genericService.signalIsValid()
        });
    }

    uri: string = this.route.snapshot.data['feature']

    items!: Tdata[]
    selectedIndex!: number

    selectedItemInitial!: Tdata
    
    isUpdated: boolean = false
    isValid: boolean = false

    inCreation: boolean = false
    
    get selectedItem(): Tdata {return this.genericService.selectedItem}
    set selectedItem(item: Tdata) {this.genericService.selectedItem = item}
    
    get updatedItem() {return this.genericService.updatedItem}
    set updatedItem(item: Tdata) {this.genericService.updatedItem = item}
    
    fields!: (keyof Tdata)[]
    
    ngOnInit(): void {
        this.fields = this.route.snapshot.data['fields']
        this.router.navigate([{ outlets: { sub: [ 'sub', -1 ] }}], {relativeTo:this.route})
        this.readAll()
    }

    readAll = () => {
        this.genericService.getItems(this.uri).subscribe({
            next: (res: Tdata[]) => {
                this.items = res
                this.selectedIndex = 0
                this.selectedItem = this.items[this.selectedIndex]
                this.read(this.selectedIndex)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
    }

    create = () => {
        this.inCreation = true
        this.genericService.signalSelectedItem.set(this.selectedItem)
        this.router.navigate([{ outlets: { sub: [ 'sub', '-1' ] }}], {relativeTo:this.route})
    }
    
    read = (index: number) => {
        if (index > -1 && index < this.items.length) {
            this.selectedIndex = index
            this.selectedItem = this.items[index]
            this.genericService.signalSelectedItem.set(this.selectedItem)
            this.router.navigate([{ outlets: { sub: [ 'sub', this.items[index][this.fields[0]] ] }}], {relativeTo:this.route})
            this.genericService.signalIsUpdated.set(false)
        } else {
            this.selectedIndex = -1
            this.router.navigate([{ outlets: { sub: [ 'sub', -1 ] }}], {relativeTo:this.route})
            this.genericService.signalSelectedItem.set(this.selectedItem)
        }        
    }        
    
    update = () => {
        if (this.genericService.updatedItem[this.fields[0]] === 0) {
            this.genericService.postItem(this.uri, this.updatedItem).subscribe({
                next: (res: Tdata) => {
                    this.items.push(res)
                    this.read(this.items.length - 1)
                },    
                error: (error: { error: { message: any; }; }) => {
                }    
            })    
        } else {
            this.genericService.putItem(this.uri, this.updatedItem[this.fields[0]], this.updatedItem).subscribe({
                next: (res: Tdata) => {
                    this.items[this.selectedIndex] = res
                    this.read(this.selectedIndex)
                },    
                error: (error: { error: { message: any; }; }) => {
                }    
            })    
        }    
    }    

    delete = () => {
        this.genericService.deleteItem(this.uri, this.selectedItem[this.fields[0]], this.selectedItem).subscribe({
            next: (res: Tdata) => {
                this.items.splice(this.selectedIndex, 1)
                if (this.items.length > 0) {
                    this.read(this.selectedIndex < this.items.length ? this.selectedIndex : this.items.length - 1)
                } else {
                    this.read(-1)
                }        
            },        
            error: (error: { error: { message: any; }; }) => {
            }        
        })        
    }        

    cancel = () => {
        this.inCreation = false
        this.read(this.selectedIndex)
    }

}
