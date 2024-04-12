import { NgFor } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class ListComponent<Tlist> implements OnInit {

    private genericService: any
    uri: string = this.route.snapshot.data['feature']

    constructor (
        private route: ActivatedRoute,
        private injector: Injector,
        private apiService: ApiService<Tlist>
    ) {
        this.genericService = injector.get<string>(<any>route.snapshot.data['requiredService']);
    }

    get items() {return this.genericService.items}

    get selectedIndex(): number {return this.genericService.selectedIndex}
    set selectedIndex(index: number) {
        this.genericService.selectedIndex = index
        this.genericService.signalSelectedIndex.set(index)
    }    

    fields!: (keyof Tlist)[]
    
    ngOnInit(): void {
        this.fields = this.route.snapshot.data['fields']
        this.readAll()
    }

    readAll = () => {
        this.apiService.getItems(this.uri).subscribe({
            next: (res: Tlist[]) => {
                this.genericService.items = res
                this.selectedIndex = res.length > 0 ? 0 : -1
            },
            error: (error: { error: { message: any; }; }) => {
            }
        })
    }

    delete = (index: number) => {
        this.apiService.deleteItem(this.uri, this.items[index]['id']).subscribe({
            next: (res: Tlist) => {
                this.items.splice(index, 1)
                if (this.items.length > 0) {
                    this.selectedIndex = this.selectedIndex < this.items.length ? this.selectedIndex : this.items.length - 1
                } else {
                    this.selectedIndex = -1
                }        
            },        
            error: (error: { error: { message: any; }; }) => {
            }        
        })        
    }        

}
