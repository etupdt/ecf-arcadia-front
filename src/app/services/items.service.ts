import { Injectable, signal } from '@angular/core';
import { IElementCrud } from '../interfaces/IElementCrud';

@Injectable({
  providedIn: 'root'
})
export class ItemsService<Tdata, TsubData> {

    items!: Tdata[]

    updatedItem!: Tdata
    savedItem!: Tdata

    subUpdatedItem!: TsubData
    subSavedItem!: TsubData

    isUpdatedItem: number = 0
    signalIsUpdatedItem = signal(this.isUpdatedItem)

    selectedIndex: number = -1
    signalSelectedIndex = signal(this.selectedIndex)

    isSubUpdatedItem: number = 0
    signalSubIsUpdatedItem = signal(this.isSubUpdatedItem)

    subSelectedIndex: number = -1
    signalSubSelectedIndex = signal(this.subSelectedIndex)

    signalIsUpdated = signal(false)
    signalIsValid = signal(false)

}
