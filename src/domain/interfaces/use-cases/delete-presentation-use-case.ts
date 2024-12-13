import { PresentationRequestModel } from "../../entities/presentation";

export interface DeletePresentationUseCase {
    execute(id:String):void
}