import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageCropperModule, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { IImage } from 'src/app/interfaces/IImage';
import { Image } from 'src/app/models/Image';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-crop',
  standalone: true,
  imports: [ImageCropperModule, NgFor],
  templateUrl: './image-crop.component.html',
  styleUrl: './image-crop.component.scss'
})
export class ImageCropComponent {

    constructor(
        private imageService: ImageService
    ) { }

    useBackendImages: string = `${environment.useBackendImages}`
                
    @Input() carousel: Image[] = []
    @Output() addCarouselImage = new EventEmitter<Image>();

    targetImageBase64: string = ''
    targetImageBlob!: Blob

    set targetImage(targetImage: any) {
        if (typeof targetImage === 'string') {
            this.targetImageBase64 = targetImage as string 
        } else {
            this.imageService.blobToBase64(targetImage).then((base64) => {this.targetImageBase64 = (base64 as string)})
            this.targetImageBlob = targetImage 
        }
    }
    
    activeImage: any
    savedImage: any
    
    imageChangedEvent: any;

    showCropper = true;

    imageWidth = 360
    
    rotation = 0;
    scale = 1;
    
    ratio1 = 20
    ratio2 = 14
    
    transform: ImageTransform = {};
    
    imageCropped(event: ImageCroppedEvent) {
        this.targetImage = event.blob
    }
    
    imageLoaded(image?: LoadedImage) {
        this.showCropper = true;
    }
    
    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready');
    }
    
    loadImageFailed() {
        console.log('Load failed');
    }
    
    fileChangeEvent(event: any): void {
        if (event.target.files[0]) {
            this.savedImage = event.target.files[0]
            this.activeImage = event.target.files[0]
            this.targetImage = event.target.files[0]
            event.target.value = ""
        }
    }
    
    getImageUrl (image: IImage) { 
        return `${image.imageName.indexOf('data:image') === 0 ? image.imageName : this.useBackendImages + '/' + image.imageName}` 
    }
    
    ratio = () => {
        [this.ratio1, this.ratio2] = [this.ratio2, this.ratio1]
    }
    
    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
      }
    
    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }
    
    addImage = () => {
        this.addCarouselImage.emit(new Image(0, this.targetImageBase64, '', this.targetImageBlob))
        this.activeImage = ''
        this.targetImage = ''
    }

    replaceImage = () => {
        this.activeImage = this.targetImageBlob
    }
    
    reinitImage = () => {
    
        this.scale = 1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        }
    
        this.activeImage = this.savedImage
        this.targetImage = this.savedImage
       
    }
        
}
