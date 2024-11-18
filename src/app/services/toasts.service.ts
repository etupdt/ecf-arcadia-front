import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastsService {

    toasts: any[] = []

    toastRefresh: boolean = false

    constructor() { }

    show(message: string, delay: number): any {
        return this.toasts.push({ message: message, delay: delay, autohide: true })
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast)
    }

}
