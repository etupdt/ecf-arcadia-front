import { Habitat } from "./Habitat";
import { IImage } from "./IImage";
import { Race } from "./Race";
import { VeterinaryReport } from "./VeterinaryReport";

export interface Animal {
    id: number,
    firstname: string,
    health: string,
    race: Race,
    habitat?: Habitat,
    images: IImage[],
    veterinaryReports: VeterinaryReport[]
}