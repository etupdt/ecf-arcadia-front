import { IImage } from "../interfaces/IImage";

export class Image implements IImage {

    constructor (
        public id: number,
        public imageName: string,
        public hash: string,
        public imageBlob : Blob
    ) {}

}