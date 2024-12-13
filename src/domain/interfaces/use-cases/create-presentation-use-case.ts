import { PresentationRequestModel } from "../../entities/presentation";

export interface CreatePresentationUseCase {
    execute(presentation:PresentationRequestModel):void;
}