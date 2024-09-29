import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/models/Image';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [NgFor],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

    @Input() carousel: Image[] = []
    @Output() deleteCarouselImage = new EventEmitter<number>();

    useBackendImages: string = environment.useBackendImages

    getImageUrl (image: Image) { 
        return `${image.imageName.indexOf('data:image') === 0 ? image.imageName : this.useBackendImages + '/' + image.imageName}` 
    }

    delete = (index: number) => {
        this.deleteCarouselImage.emit(index)
    }

}
