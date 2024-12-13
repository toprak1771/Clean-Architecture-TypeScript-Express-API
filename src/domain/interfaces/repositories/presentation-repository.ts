import {Presentation,PresentationRequestModel} from "../../entities/presentation";

export interface PresentationRepository {
    createPresentation(presentation:PresentationRequestModel):void;
    deletePresentation(id:String):void;
    updatePresentation(id:String,data:PresentationRequestModel):void;
    getPresentations():Promise<Presentation[]>;
    getPresentation(id:String):Promise<Presentation | null>;
}