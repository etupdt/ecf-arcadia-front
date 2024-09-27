import { IImage } from "../interfaces/IImage";

export class Image implements IImage {

    constructor (
        public id: number = 0,
        public imageName: string = '',
        public hash: string = '',
        public imageBlob : Blob
    ) {}

    static deserialize  (data: any, level: number): Image {
        return new Image(
            data.id,
            data.imageName,
            data.hash,
            data.imageBlob
        )
    }

}