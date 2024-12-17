import { PresentationRequestModel } from "../../entities/presentation";

export interface UpdatePresentationUseCase {
    execute(id:String,data:PresentationRequestModel):void;
}