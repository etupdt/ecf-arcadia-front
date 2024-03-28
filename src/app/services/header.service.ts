import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    constructor() { }

    selectedMenuItem: string = "Habitats"
    signalItemSelected = signal(this.selectedMenuItem)

    collapseAnimals: number =  0
    signalCollapseAnimals = signal(this.collapseAnimals)

}
