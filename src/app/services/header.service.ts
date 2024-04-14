import { Injectable, signal } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    constructor() {
      console.log('construct header service : ', this)
     }

    selectedMenuItem: string = 'Habitats'
    signalItemSelected = signal(this.selectedMenuItem)

    user: User = new User()
    signalUser = signal(this.user)

    collapseAnimals: number =  0
    signalCollapseAnimals = signal(this.collapseAnimals)

}
