import {Presentation,PresentationRequestModel,CreatePresentationObject} from "../../entities/presentation";

export interface PresentationRepository {
    createPresentation(presentation:CreatePresentationObject):void;
    deletePresentation(id:String):void;
    updatePresentation(id:String,data:PresentationRequestModel):void;
    getPresentations():Promise<Presentation[] | void>;
    getPresentation(id:String):Promise<Presentation | null>;
}