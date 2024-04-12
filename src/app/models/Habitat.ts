import { HttpHeaders } from "@angular/common/http";
import { Animal } from "../interfaces/Animal";
import { IHabitat } from "../interfaces/IHabitat";
import { Md5 } from 'ts-md5';
import { IImage } from "../interfaces/IImage";
import { Image } from "../models/Image";

export class Habitat implements IHabitat {

    constructor (
        public id: number,
        public name: string,
        public description: string,
        public comment: string,
        public animals: Animal[],
        public images: Image[]
    ) {}

    getApiItemBody (): any {

        const formData: FormData = new FormData();
        const images: IImage[] = []
        
        this.images!.forEach((image) => {
            
            let imageName : string = image.imageName 
            let hash: string = image.hash
           
            if (image.imageBlob) {
                hash = Md5.hashStr(image.imageName);
                imageName = `habitat_${hash}.webp`
                formData.append('files', image.imageBlob, imageName) 
            }
           
            images.push({
                id: image.id,
                imageName: imageName,
                hash: hash
            })
            
        })        

        formData.append('item', JSON.stringify({
            id: this.id,
            name: this.name,
            description: this.description,
            comment: this.comment,
            animals: this.animals,
            images: images
        }))

        return formData

    }

    getApiItemHeaders (): HttpHeaders {
        
        let headers = new HttpHeaders()
        headers.append('Content-Type','multipart/form-data')

        return headers

    }

}