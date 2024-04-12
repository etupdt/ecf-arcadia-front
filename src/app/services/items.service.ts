import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService<Tdata> {
    getItems(arg0: string): Observable<import("src/app/interfaces/IHabitat").IHabitat[]> {
      throw new Error('Method not implemented.');
    }

    items!: Tdata[]

    updatedItem!: any

    isUpdatedItem: number = 0
    signalIsUpdatedItem = signal(this.isUpdatedItem)

    selectedIndex: number = -1
    signalSelectedIndex = signal(this.selectedIndex)

    signalIsUpdated = signal(false)
    signalIsValid = signal(false)

}
