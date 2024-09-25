import { HttpHeaders } from "@angular/common/http";
import { IAnimal } from "../interfaces/IAnimal";
import { Md5 } from 'ts-md5';
import { IImage } from "../interfaces/IImage";
import { Image } from "./Image";
import { FoodAnimal } from "../models/FoodAnimal";
import { Breed } from "./Breed";
import { Habitat } from "./Habitat";
import { VeterinaryReport } from "./VeterinaryReport";

export class Animal implements IAnimal {

    constructor (
        public id: number = 0,
        public firstname: string = '',
        public health: string = '',
        public description: string = '',
        public breed: Breed = new Breed(),
        public habitat: Habitat = new Habitat(),
        public images: Image[] = [],
        public veterinaryReports: VeterinaryReport[] = [],
        public foodAnimals: FoodAnimal[] = [],
    ) {}

    static deserialize (data: any, level: number, origin?: string): Animal {
        return new Animal(
            data.id,
            data.firstname,
            data.health,
            data.description,
            level > 0 ? Breed.deserialize(data.breed, level - 1) : new Breed(),
            level > 0 && origin !== 'Habitat' ? Habitat.deserialize(data.habitat, level - 1) : new Habitat(),
            level > 0 ? Object.assign([], data.images.map((image: Image) => Image.deserialize(image, level - 1))) : [],
            level > 0 ? Object.assign([], data.veterinaryReports.map((veterinaryReport: VeterinaryReport) => VeterinaryReport.deserialize(veterinaryReport, level - 1))) : [],
            level > 0 ? Object.assign([], data.foodAnimals.map((foodAnimal: FoodAnimal) => FoodAnimal.deserialize(foodAnimal, level - 1))) : []
        )
    }

    getApiItemBody (): any {

        const formData: FormData = new FormData();
        const images: IImage[] = []
        
        this.images!.forEach((image) => {
            
            let imageName : string = image.imageName 
            let hash: string = image.hash
           
            if (image.imageBlob) {
                hash = Md5.hashStr(image.imageName);
                imageName = `animal_${hash}.webp`
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
            firstname: this.firstname,
            health: this.health,
            description: this.description,
            breed: this.breed,
            habitat: this.habitat,
            images: images,
            veterinaryReports: this.veterinaryReports,
            foodAnimals: this.foodAnimals
        }))

        return formData

    }

    getApiItemHeaders (): HttpHeaders {
        
        let headers = new HttpHeaders()
        headers.append('Content-Type','multipart/form-data')

        return headers

    }

}