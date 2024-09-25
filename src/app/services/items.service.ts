import { Injectable, signal } from '@angular/core';
import { IElementCrud } from '../interfaces/IElementCrud';

@Injectable({
  providedIn: 'root'
})
export class ItemsService<Tdata> {

    items!: Tdata[]

    updatedItem!: Tdata
    savedItem!: Tdata

    // subUpdatedItem!: TsubData
    // signalSubUpdatedItem!: TsubData

    isUpdatedItem: number = 0
    signalIsUpdatedItem = signal(this.isUpdatedItem)

    selectedIndex: number = -1
    signalSelectedIndex = signal(this.selectedIndex)

    signalIsUpdated = signal(false)
    signalIsValid = signal(false)

}
