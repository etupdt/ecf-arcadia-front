import { Injectable, signal } from '@angular/core';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    selectedMenuItem: string = ''
    signalItemSelected = signal(this.selectedMenuItem)

    selectedSubMenuItem: string = ''
    signalSubItemSelected = signal(this.selectedSubMenuItem)

    user: User = new User()
    signalUser = signal(this.user)

    collapseAnimals: number =  0
    signalCollapseAnimals = signal(this.collapseAnimals)

}
