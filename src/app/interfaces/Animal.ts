import { Habitat } from "./Habitat";
import { Race } from "./Race";

export interface Animal {
    id: number,
    firstname: string,
    health: string,
    race: Race,
    habitat?: Habitat
}