import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastsService {

    toasts: any[] = [];

    constructor() { }

    show(message: string, delay: number) {
        this.toasts.push({ message: message, delay: delay, autohide: true });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

}
