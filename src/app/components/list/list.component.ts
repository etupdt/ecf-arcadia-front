import { NgFor, NgIf } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IElementCrud } from 'src/app/interfaces/IElementCrud';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderService } from 'src/app/services/header.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class ListComponent<Tdata> implements OnInit {

    private genericService: any
    uri: string = this.route.snapshot.data['feature']

    constructor (
        private route: ActivatedRoute,
        private injector: Injector,
        private apiService: ApiService<Tdata>,
        private authService: AuthService,
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
    }

    get items(): Tdata[] {return this.genericService.items}

    get selectedIndex(): number {return this.genericService.selectedIndex}
    setSelectedIndex(index: number) {
        this.genericService.selectedIndex = index
        this.genericService.isUpdatedItem++
        this.genericService.signalIsUpdatedItem.set(this.genericService.isUpdatedItem)
        // this.genericService.signalSelectedIndex.set(this.genericService.selectedIndex)
    }    

    fields!: (keyof Tdata)[]
    
    ngOnInit(): void {
        this.fields = this.route.snapshot.data['fields']
        this.readAll()
    }

    readAll = () => {
        this.apiService.getItems(this.uri).subscribe({
            next: (res: any[]) => {
                this.genericService.items = res
                this.setSelectedIndex(res.length > 0 ? 0 : -1)
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
    }

    delete = (index: number) => {
        this.apiService.deleteItem(this.uri, this.items[index]['id' as keyof Tdata] as number).subscribe({
            next: (res: Tdata) => {
                this.items.splice(index, 1)
                if (this.items.length > 0) {
                    this.setSelectedIndex(this.selectedIndex < this.items.length ? this.selectedIndex : this.items.length - 1)
                } else {
                    this.setSelectedIndex(-1)
                }        
            },        
            error: (error: { error: { message: any; }; }) => {
            }        
        })        
    }        

    get user() {return this.authService.user}

}
