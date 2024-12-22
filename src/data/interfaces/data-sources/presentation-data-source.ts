import { Presentation,PresentationRequestModel,CreatePresentationObject } from "../../../domain/entities/presentation";

export interface PresentationDataSource {
    create(presentation:CreatePresentationObject):void;
    getAll():Promise<Presentation[]>;
    deleteOne(id:String):void;
    updateOne(id:String,data:Presentation):void;
    getOne(id:String):Promise<Presentation | null>;
}