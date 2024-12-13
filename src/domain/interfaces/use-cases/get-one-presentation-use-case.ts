import { Presentation } from "../../entities/presentation";

export interface GetOnePresentationUseCase {
    execute(id:String):Promise<Presentation | null>;
}