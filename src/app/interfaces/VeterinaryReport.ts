import { Animal } from "./Animal";
import { User } from "./User";

export interface VeterinaryReport {
    id: number,
    date: string,
    detail: string,
    animal: Animal,
    user: User
}