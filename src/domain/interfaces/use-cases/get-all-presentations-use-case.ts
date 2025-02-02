import { Presentation } from "../../entities/presentation";

export interface GetAllPresentationsUseCase {
    execute():Promise<Presentation[] | void>;
}